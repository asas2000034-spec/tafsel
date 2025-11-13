"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function FactoryAddBlankPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [baseCost, setBaseCost] = useState(50);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/factory/catalog");
  };

  return (
    <section className="space-y-8">
      <header className="space-y-3 text-right">
        <h1 className="text-3xl font-bold text-white">
          إضافة منتج خام جديد للكتالوج
        </h1>
        <p className="text-neutral-300">
          عرف مواصفات المنتج الخام لتسهيل ربطه بتصاميم المصممين.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl border border-white/10 bg-white/10 p-8 text-white shadow-xl backdrop-blur"
      >
        <div className="space-y-2 text-right">
          <label className="block text-sm font-semibold">اسم المنتج</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-3xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-200/40"
            placeholder="مثال: تي شيرت بريميوم"
            required
          />
        </div>

        <div className="space-y-2 text-right">
          <label className="block text-sm font-semibold">الوصف</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            className="w-full rounded-3xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-200/40"
            placeholder="صف المواد المستخدمة، نوع القماش، أو نقاط الجودة."
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 text-right">
            <label className="block text-sm font-semibold">الألوان المتاحة</label>
            <input
              value={colors}
              onChange={(event) => setColors(event.target.value)}
              className="w-full rounded-3xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-200/40"
              placeholder="أسود، أبيض، رمادي"
            />
          </div>
          <div className="space-y-2 text-right">
            <label className="block text-sm font-semibold">المقاسات</label>
            <input
              value={sizes}
              onChange={(event) => setSizes(event.target.value)}
              className="w-full rounded-3xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-200/40"
              placeholder="S, M, L, XL"
            />
          </div>
        </div>

        <div className="space-y-2 text-right">
          <label className="block text-sm font-semibold">
            التكلفة الأساسية (بالـ TFT)
          </label>
          <input
            type="number"
            min={10}
            step={5}
            value={baseCost}
            onChange={(event) => setBaseCost(Number(event.target.value))}
            className="w-full rounded-3xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-200/40"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-white px-6 py-3 text-base font-semibold text-neutral-900 transition hover:bg-amber-200"
        >
          حفظ المنتج الخام
        </button>
      </form>
    </section>
  );
}
