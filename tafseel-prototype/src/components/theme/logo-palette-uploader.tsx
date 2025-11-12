'use client';

import Image from 'next/image';
import { useState } from 'react';
import ColorThief from 'color-thief-browser';
import { useTheme, rgbTripletsToHex } from '@/providers/theme-provider';
import { cn } from '@/lib/utils';

type ExtractedPalette = {
  dominant: string;
  palette: string[];
};

const colorThief = new ColorThief();

export function LogoPaletteUploader() {
  const { setPaletteFromLogo, palette } = useTheme();
  const [preview, setPreview] = useState<string | null>(null);
  const [extracted, setExtracted] = useState<ExtractedPalette | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsProcessing(true);

    const objectUrl = URL.createObjectURL(file);
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = objectUrl;

    image.onload = () => {
      try {
        const dominant = colorThief.getColor(image);
        const paletteColors = colorThief.getPalette(image, 6);
        const uniqueColors = Array.from(
          new Set(rgbTripletsToHex([dominant, ...paletteColors])),
        );

        if (!uniqueColors.length) {
          throw new Error('لم يتم العثور على ألوان كافية في الشعار');
        }

        const [primary, secondary, accent, neutralCandidate] = uniqueColors;
        const neutral =
          neutralCandidate ??
          (secondary ? secondary : palette.neutral ?? primary);

        setExtracted({
          dominant: primary,
          palette: uniqueColors.slice(0, 6),
        });
        setPreview(objectUrl);

        setPaletteFromLogo([
          primary,
          secondary ?? primary,
          accent ?? primary,
          neutral,
        ]);
      } catch (extractionError) {
        console.error(extractionError);
        setError('تعذر استخراج الألوان من الشعار، يرجى المحاولة بشعار آخر.');
      } finally {
        setIsProcessing(false);
      }
    };

    image.onerror = () => {
      setError('فشل تحميل صورة الشعار.');
      setIsProcessing(false);
    };
  };

  return (
    <div className="space-y-6 rounded-3xl border border-border/40 bg-surface/80 p-6 shadow-card backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-text-muted">
            قم برفع شعار تفصيل أو أي شعار آخر لتوليد لوحة الألوان تلقائياً
          </p>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/20">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {isProcessing ? 'جاري التحليل...' : 'رفع الشعار'}
        </label>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-400/50 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-surface p-4">
          <div className="rounded-2xl bg-background/60 p-4 text-center">
            {preview ? (
              <Image
                src={preview}
                alt="Logo preview"
                width={180}
                height={140}
                unoptimized
                className="mx-auto h-36 w-auto object-contain drop-shadow-xl"
              />
            ) : (
              <div className="flex h-36 flex-col items-center justify-center gap-3 text-sm text-text-muted">
                لا يوجد شعار بعد
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-text-muted">
            لوحة الألوان الحالية
          </h4>
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(palette).map(([token, value]) => (
              <div
                key={token}
                className="group flex items-center justify-between rounded-2xl border border-border/40 bg-surface/80 p-4"
              >
                <div>
                  <p className="text-xs uppercase tracking-wide text-text-muted">
                    {token}
                  </p>
                  <p className="font-semibold text-text">
                    {value.toUpperCase()}
                  </p>
                </div>
                <span
                  className={cn(
                    'h-12 w-12 rounded-xl border border-border/40 shadow-inner transition group-hover:scale-105',
                  )}
                  style={{ backgroundColor: value }}
                />
              </div>
            ))}
          </div>

          {extracted && (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                الألوان المستخرجة
              </p>
              <div className="flex flex-wrap gap-3">
                {extracted.palette.map((color) => (
                  <div
                    key={color}
                    className="flex items-center gap-2 rounded-full border border-border/30 bg-surface/80 px-3 py-1.5 text-xs text-text shadow"
                  >
                    <span
                      className="h-5 w-5 rounded-full border border-border/40"
                      style={{ backgroundColor: color }}
                    />
                    {color.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
