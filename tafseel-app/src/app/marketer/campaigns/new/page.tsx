"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCampaignPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !url) {
      setError("فضلاً أكمل جميع الحقول.");
      return;
    }
    setError(null);
    router.push(
      `/marketer/campaigns/success?name=${encodeURIComponent(name)}&url=${encodeURIComponent(url)}`,
    );
  };

  return (
    <section className="space-y-8 text-right">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-neutral-900">إنشاء حملة جديدة</h1>
        <p className="text-neutral-600">
          انسخ رابط المنتج من المول أو المزاد، وأضف اسماً للحملة لتتابع أداءها
          بسهولة.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl border border-amber-100 bg-white/90 p-8 shadow-lg"
      >
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-600">
            اسم الحملة
          </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-3xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
            placeholder="مثال: حملة تي شيرت المصمم خالد"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-600">
            رابط المنتج
          </label>
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="w-full rounded-3xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
            placeholder="الصق رابط المنتج من /app/mall أو /app/auctions"
            required
          />
        </div>

        {error && (
          <p className="rounded-3xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-full bg-neutral-900 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-neutral-700"
        >
          إنشاء
        </button>
      </form>
    </section>
  );
}
