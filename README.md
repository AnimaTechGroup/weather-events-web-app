# Meridian — weather-events web app

Public reading view for the **gold** earthquake tables. No login. No Supabase.

Vite + React + TypeScript. Gold is mocked today (earthquakes, US tornadoes, tropical cyclones) and can later be static JSON on S3/CloudFront. The header switches hazard.

## Why there is no Supabase

The UI only needs:

- `quakes_yearly` — one row per year
- `quakes_yearly_by_country` — one row per year × country

That is a few thousand rows, published after the gold job. A browser can load JSON. Auth, RLS, and Postgres add cost without helping these three screens.

Add Supabase later only if you need accounts or write-back.

## Screens

1. **This year** — worldwide M5+ total for the latest gold year
2. **Timeline** — same totals, newest year first, down to 1950
3. **By country** — current year only, default **Brazil**

## Gold shape (mock = future files)

```ts
{ year, event_count, max_severity }
{ year, region_iso, region_name, event_count, max_severity }
```

| Hazard | Yearly mock | Region mock | Default filter |
|---|---|---|---|
| Earthquakes | worldwide M5+ | country | Brazil |
| Tornadoes | US SPC-style | US state | Texas |
| Cyclones | named storms | basin | South Atlantic |

Mocks live in `src/data/gold/`. The loader is `src/services/goldHazards.ts`.

## Languages

UI copy lives in `src/i18n/locales/` (`en`, `pt`, `fr`, `es`). The header switcher stores the choice in `localStorage` (`meridian.locale`) and otherwise follows the browser language.

## Run

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Env

Copy `.env.example` → `.env`. Leave `VITE_GOLD_BASE_URL` empty to use mocks. When gold is published:

```bash
VITE_GOLD_BASE_URL=https://your-cdn/gold/weather-events
VITE_DATA_MODE=lake
```

The app will GET:

- `{VITE_GOLD_BASE_URL}/quakes_yearly.json`
- `{VITE_GOLD_BASE_URL}/quakes_yearly_by_country.json`
