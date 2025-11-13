"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function DesignerUploadPage() {
  const router = useRouter();
  const [designName, setDesignName] = useState("");
  const [description, setDescription] = useState("");
  const [fileSelected, setFileSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!designName || !description || !fileSelected) {
      setError("فضلاً أكمل الحقول وقم برفع ملف التصميم.");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/designer/dual-choice");
    }, 1200);
  };

  return (
    <section className="space-y-8">
      <header className="space-y-3 text-right">
        <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1 text-sm font-semibold text-purple-700">
          خطوة التوثيق
        </span>
        <h1 className="text-3xl font-bold text-neutral-900">
          رفع تصميم جديد (Auto-Mint NFT)
        </h1>
        <p className="text-neutral-600">
          سيتم توثيق تصميمك تلقائياً على Polygon لحفظ الحقوق قبل نشره في المول أو
          المزاد.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl border border-purple-100 bg-white/90 p-8 shadow-lg"
      >
        <div className="space-y-2 text-right">
          <label className="block text-sm font-semibold">ملف التصميم</label>
          <label
            htmlFor="file"
            className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-neutral-200 bg-neutral-50 px-6 py-10 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900"
          >
            <span className="text-3xl">⬆️</span>
            <span className="text-sm">
              اسحب الملف هنا أو اضغط لاختيار ملف بصيغة PNG / SVG / PDF
            </span>
            <input
              id="file"
              type="file"
              className="hidden"
              onChange={(event) => setFileSelected(Boolean(event.target.files?.length))}
            />
          </label>
          {fileSelected && (
            <p className="text-sm text-emerald-600">تم اختيار الملف بنجاح.</p>
          )}
        </div>

        <div className="space-y-2 text-right">
          <label htmlFor="designName" className="block text-sm font-semibold">
            اسم التصميم
          </label>
          <input
            id="designName"
            value={designName}
            onChange={(event) => setDesignName(event.target.value)}
            className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
            placeholder="اسم التصميم كما سيظهر للعملاء"
            required
          />
        </div>

        <div className="space-y-2 text-right">
          <label htmlFor="description" className="block text-sm font-semibold">
            الوصف
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
            placeholder="صف تصميمك ومصدر الإلهام والمواد المقترحة"
            required
          />
        </div>

        <p className="rounded-3xl bg-purple-50 px-4 py-3 text-sm text-purple-700">
          ملاحظة: سيتم توثيق التصميم كـ NFT على شبكة Polygon، وستحصل على إثبات
          ملكية يمكن مشاركته مع عملائك.
        </p>

        {error && (
          <p className="rounded-3xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-neutral-700 disabled:cursor-wait disabled:bg-neutral-600"
        >
          {isSubmitting ? "جاري التوثيق..." : "توثيق وحفظ الحقوق"}
        </button>
      </form>
    </section>
  );
}
