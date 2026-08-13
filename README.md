# Terra Stats — weather-events web app

Public reading view for **gold** hazard tables (earthquakes, US tornadoes, tropical cyclones). No user login. No Supabase.

Vite + React + TypeScript. Three hazards in the header. EN / PT / FR / ES.

## Data modes

| Mode | Env | Notes |
|---|---|---|
| **Mock** (default) | leave gold vars empty | local demo |
| **Private lake API** | `VITE_GOLD_API_URL` + `VITE_GOLD_API_KEY` | no login; app key + CORS |
| Legacy public JSON | `VITE_GOLD_BASE_URL` only | avoid for private lake |

Gold JSON stays **private in S3**. Terra Stats calls **API Gateway + Lambda** with header `X-Gold-Api-Key`. Other browser origins are blocked by CORS.

## Screens

1. **This year** — total for the latest gold year + vs last year
2. **Timeline** — yearly counts, 1950 → now
3. **Filter** — country / US state / basin (hazard-specific default)

## Run locally

```bash
npm install
npm run dev
```

## Connect to the private lake API

After `terraform apply` in `game-data-infrastructure`:

```bash
terraform output weather_events_gold_api_url
terraform output -raw weather_events_gold_api_key
```

Then `.env`:

```bash
VITE_GOLD_API_URL=https://xxxx.execute-api.us-east-1.amazonaws.com
VITE_GOLD_API_KEY=<paste key>
VITE_DATA_MODE=lake
```

Authenticated routes (app key header, no Cognito):

- `GET /v1/{quakes|tornadoes|cyclones}/yearly`
- `GET /v1/{quakes|tornadoes|cyclones}/by-region`

Add your deploy origin to `weather_events_api_cors_origins` in Terraform before production.

## Deploy

Local one-shot (from `game-data-infrastructure`):

```bash
AWS_PROFILE=personal ./scripts/deploy_terra_stats.sh
```

**CI:** every push to `main` (including PR merges) runs `.github/workflows/deploy.yml`: `npm ci` → `vite build` with lake env → `aws s3 sync` → CloudFront invalidate.

Repo secrets on [AnimaTechGroup/weather-events-web-app](https://github.com/AnimaTechGroup/weather-events-web-app):

| Secret | Value |
|---|---|
| `VITE_GOLD_API_URL` | `terraform output weather_events_gold_api_url` |
| `VITE_GOLD_API_KEY` | `terraform output -raw weather_events_gold_api_key` |
| `AWS_ACCESS_KEY_ID` | access key for IAM user `game-data-terra-stats-github-deploy-development` |
| `AWS_SECRET_ACCESS_KEY` | matching secret |

Manual rerun: GitHub → Actions → **Deploy Terra Stats** → **Run workflow**.

## Go live (S3 + CloudFront + Hostinger domain)

The app is a static Vite build. AWS serves it; Hostinger only holds the domain.

```bash
cd ../game-data-infrastructure
AWS_PROFILE=personal terraform apply   # creates the bucket + CloudFront
AWS_PROFILE=personal ./scripts/deploy_terra_stats.sh
```

`terraform output terra_stats_cloudfront_url` is the live site (HTTPS) immediately.

Then in Hostinger hPanel → **Domains** → **DNS / DNS Zone**:

1. Send the exact domain (e.g. `example.com`) so Terraform can request an ACM cert.
2. Add the CNAME records from `terraform output terra_stats_acm_dns_validation` (AWS HTTPS).
3. After the cert issues, apply again, then:

| Type | Name | Points to |
|---|---|---|
| CNAME | `www` | the CloudFront domain (`dxxxx.cloudfront.net`) |
| Redirect / ALIAS | `@` | `https://www.example.com` (Hostinger “Redirect domain”) |

Do **not** paste CloudFront IPs into A records. Keep Hostinger nameservers; do not move the domain unless you want Route53.

## Gold shape

```ts
{ year, event_count, max_severity }
{ year, region_iso, region_name, event_count, max_severity }
```

Loader: `src/services/goldHazards.ts`.
