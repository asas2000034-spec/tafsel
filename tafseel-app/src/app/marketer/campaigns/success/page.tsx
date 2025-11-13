"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\u0621-\u064a0-9a-z]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export default function CampaignSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const name = searchParams.get("name") ?? "حملة جديدة";
  const url = searchParams.get("url") ?? "https://tafseel.com/app/mall";

  const trackingLink = useMemo(() => {
    const slug = slugify(name) || "campaign";
    const uniquePart = `${slug.slice(0, 6)}-${hashString(name).slice(0, 4)}`;
    return `https://tafseel.com/track/${uniquePart}`;
  }, [name]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trackingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="space-y-8 text-right">
      <header className="space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">
          تم إنشاء الحملة بنجاح
        </span>
        <h1 className="text-3xl font-bold text-neutral-900">
          حملتك جاهزة للانطلاق!
        </h1>
        <p className="text-neutral-600">
          شارك رابط التتبع أو استخدم رمز QR لبدء الترويج فوراً.
        </p>
      </header>

      <Card className="grid gap-6 rounded-3xl border border-emerald-100 bg-white/90 p-8 shadow-lg lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-neutral-500">اسم الحملة</p>
            <p className="text-lg font-semibold text-neutral-900">{name}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-500">رابط المنتج الأصلي</p>
            <a
              href={url}
              className="break-all text-sm text-amber-600 hover:text-amber-500"
            >
              {url}
            </a>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-neutral-500">رابط التتبع</p>
            <div className="flex flex-col gap-3 rounded-3xl border border-neutral-200 bg-neutral-50 p-4 text-right">
              <span className="font-semibold text-neutral-900 break-all">
                {trackingLink}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="self-start rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700"
              >
                {copied ? "تم النسخ ✅" : "نسخ الرابط"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
          <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-500 text-white">
            <span className="text-center text-sm leading-relaxed">
              QR Code
              <br />
              (Placeholder)
            </span>
          </div>
          <button
            type="button"
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            تحميل QR
          </button>
        </div>
      </Card>

      <div className="flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/marketer/dashboard")}
          className="rounded-full bg-neutral-900 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-neutral-700"
        >
          العودة للوحة التحكم
        </button>
        <button
          type="button"
          onClick={() => router.push("/marketer/campaigns/new")}
          className="rounded-full border border-neutral-300 px-6 py-3 text-base font-semibold text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
        >
          إنشاء حملة أخرى
        </button>
      </div>
    </section>
  );
}
