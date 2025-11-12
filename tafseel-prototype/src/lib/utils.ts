import chroma from "chroma-js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export function rgbArrayToHex(rgb: number[]): string {
  return chroma(rgb).hex();
}

export function hexToRgbArray(hex: string): number[] {
  const [r, g, b] = chroma(hex).rgb();
  return [Math.round(r), Math.round(g), Math.round(b)];
}

export function rgbArrayToCssVar(rgb: number[]): string {
  return rgb.map((value) => Math.min(255, Math.max(0, Math.round(value)))).join(" ");
}

export function getReadableTextColor(hex: string): string {
  const luminance = chroma(hex).luminance();
  return luminance > 0.55 ? "#0b0b0c" : "#f7f8ff";
}

export function createAccentFromPalette(palette: string[]): string {
  if (!palette.length) return "#8f7bff";
  const sorted = [...palette].sort(
    (a, b) => chroma(b).saturation() - chroma(a).saturation(),
  );
  return sorted[0];
}

export function createNeutralFromPrimary(primary: string): string {
  return chroma(primary).desaturate(2).brighten(0.6).hex();
}
