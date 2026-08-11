import type { HazardId } from "@/types/gold";

export function formatCount(value: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatSeverity(hazard: HazardId, value: number): string {
  if (hazard === "tornadoes") return `EF${Math.round(value)}`;
  if (hazard === "cyclones") return `${Math.round(value)} kt`;
  return `M${value.toFixed(1)}`;
}

export function formatMagnitude(value: number): string {
  return value.toFixed(1);
}

export function formatDate(iso: string, locale = "en-GB"): string {
  return new Date(iso).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
