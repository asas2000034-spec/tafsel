'use client';

import chroma from "chroma-js";
import {
  createAccentFromPalette,
  createNeutralFromPrimary,
  getReadableTextColor,
  hexToRgbArray,
  rgbArrayToCssVar,
  rgbArrayToHex,
} from "@/lib/utils";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ThemeMode = "light" | "dark";

export type ThemePalette = {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
};

type ThemeContextValue = {
  mode: ThemeMode;
  palette: ThemePalette;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
  setPalette: (palette: ThemePalette) => void;
  updatePalette: (palette: Partial<ThemePalette>) => void;
  setPaletteFromLogo: (colors: string[]) => void;
};

const defaultPalette: ThemePalette = {
  primary: "#8b4dff",
  secondary: "#04d7ff",
  accent: "#7cd8ff",
  neutral: "#27304b",
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function normalizePalette(
  mode: ThemeMode,
  palette: ThemePalette,
): Record<string, string> {
  const primary = palette.primary ?? defaultPalette.primary;
  const secondary = palette.secondary ?? defaultPalette.secondary;
  const accent =
    palette.accent ?? createAccentFromPalette([primary, secondary]);

  const neutral =
    palette.neutral ?? createNeutralFromPrimary(primary ?? accent);

  const background =
    mode === "light"
      ? chroma(neutral).brighten(3.2).saturate(0.4).hex()
      : chroma(neutral).darken(2.6).saturate(0.2).hex();

  const surface =
    mode === "light"
      ? chroma(background).brighten(0.8).hex()
      : chroma(background).brighten(0.4).hex();

  const border = chroma(surface).set("hsl.l", mode === "light" ? 0.75 : 0.3);

  const text =
    mode === "light"
      ? chroma(primary).set("hsl.l", 0.08).hex()
      : chroma(primary).set("hsl.l", 0.92).hex();

  const textMuted = chroma(text).set("hsl.l", mode === "light" ? 0.35 : 0.7);

  const textInverse =
    mode === "light"
      ? chroma(text).set("hsl.l", 0.96).hex()
      : chroma(text).set("hsl.l", 0.08).hex();

  return {
    primary,
    secondary,
    accent,
    neutral,
    background,
    surface,
    border: border.hex(),
    text,
    textMuted: textMuted.hex(),
    textInverse,
    onPrimary: getReadableTextColor(primary),
    onSecondary: getReadableTextColor(secondary),
    onAccent: getReadableTextColor(accent),
  };
}

function applyCssVariables(mode: ThemeMode, palette: ThemePalette) {
  if (typeof document === "undefined") return;

  const normalized = normalizePalette(mode, palette);
  const root = document.documentElement;

  root.dataset.theme = mode;

  const mapping: Record<string, string> = {
    "--color-primary": rgbArrayToCssVar(hexToRgbArray(normalized.primary)),
    "--color-on-primary": rgbArrayToCssVar(
      hexToRgbArray(normalized.onPrimary),
    ),
    "--color-secondary": rgbArrayToCssVar(hexToRgbArray(normalized.secondary)),
    "--color-on-secondary": rgbArrayToCssVar(
      hexToRgbArray(normalized.onSecondary),
    ),
    "--color-accent": rgbArrayToCssVar(hexToRgbArray(normalized.accent)),
    "--color-on-accent": rgbArrayToCssVar(
      hexToRgbArray(normalized.onAccent),
    ),
    "--color-neutral": rgbArrayToCssVar(hexToRgbArray(normalized.neutral)),
    "--color-background": rgbArrayToCssVar(hexToRgbArray(normalized.background)),
    "--color-surface": rgbArrayToCssVar(hexToRgbArray(normalized.surface)),
    "--color-border": rgbArrayToCssVar(hexToRgbArray(normalized.border)),
    "--color-text": rgbArrayToCssVar(hexToRgbArray(normalized.text)),
    "--color-text-muted": rgbArrayToCssVar(
      hexToRgbArray(normalized.textMuted),
    ),
    "--color-text-inverse": rgbArrayToCssVar(
      hexToRgbArray(normalized.textInverse),
    ),
  };

  Object.entries(mapping).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

function createPaletteFromLogo(colors: string[]): ThemePalette {
  if (!colors.length) return defaultPalette;

  const [dominant, ...rest] = colors;
  const chromaDominant = chroma(dominant);

  const secondary =
    rest[0] ??
    chromaDominant.set("hsl.h", chromaDominant.get("hsl.h") + 38).hex();

  const accent = createAccentFromPalette(rest.length ? rest : colors);
  const neutral = createNeutralFromPrimary(dominant);

  return {
    primary: dominant,
    secondary,
    accent,
    neutral,
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [palette, setPalette] = useState<ThemePalette>(defaultPalette);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedMode = window.localStorage.getItem(
      "tafseel-theme-mode",
    ) as ThemeMode | null;
    const storedPalette = window.localStorage.getItem("tafseel-theme-palette");

    if (storedMode === "light" || storedMode === "dark") {
      setMode(storedMode);
    }
    if (storedPalette) {
      try {
        const parsed = JSON.parse(storedPalette) as ThemePalette;
        if (parsed?.primary) {
          setPalette(parsed);
        }
      } catch (error) {
        console.warn("فشل قراءة لوحة الألوان المخزنة:", error);
      }
    }
  }, []);

  useEffect(() => {
    applyCssVariables(mode, palette);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("tafseel-theme-mode", mode);
      window.localStorage.setItem("tafseel-theme-palette", JSON.stringify(palette));
    }
  }, [mode, palette]);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const updatePalette = useCallback((partial: Partial<ThemePalette>) => {
    setPalette((prev) => ({
      ...prev,
      ...partial,
    }));
  }, []);

  const setPaletteFromLogo = useCallback((colors: string[]) => {
    const paletteFromLogo = createPaletteFromLogo(colors);
    setPalette(paletteFromLogo);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      palette,
      toggleMode,
      setMode,
      setPalette,
      updatePalette,
      setPaletteFromLogo,
    }),
    [mode, palette, toggleMode, updatePalette, setPaletteFromLogo],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme يجب استخدامه داخل ThemeProvider");
  }
  return context;
}

export function themePaletteToRgbStrings(palette: ThemePalette) {
  return Object.fromEntries(
    Object.entries(palette).map(([key, value]) => [
      key,
      rgbArrayToCssVar(hexToRgbArray(value)),
    ]),
  );
}

export function rgbTripletsToHex(colors: number[][]): string[] {
  return colors.map(rgbArrayToHex);
}
