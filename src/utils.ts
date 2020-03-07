export function formatString(s: string, ...insertions: string[]): string {
  return s.replace(/{(\d+)}/g, function(match, number) {
    return typeof insertions[number] != "undefined"
      ? insertions[number]
      : match;
  });
}

export function roundNd(n: number, d: number): number {
  return Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
}

export function round2d(n: number): number {
  return roundNd(n, 2);
}

export function fixedNd(n: number, before: number, after: number): string {
  return ("0".repeat(before) + roundNd(n, after).toFixed(after)).slice(
    -before - after
  );
}

export function parseFloatStrict(value: string) {
  if (/^(-|\+)?([0-9]+(\.[0-9]+)?)$/.test(value)) return Number(value);
  return NaN;
}
