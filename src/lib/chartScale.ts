export function niceCeil(value: number): number {
  if (value <= 0) return 100;
  const exponent = 10 ** Math.floor(Math.log10(value));
  const normalized = value / exponent;
  const nice = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return nice * exponent;
}

export function yTicks(maxValue: number, count = 5): number[] {
  const top = niceCeil(maxValue);
  const step = top / (count - 1);
  return Array.from({ length: count }, (_, index) => Math.round(step * index));
}
