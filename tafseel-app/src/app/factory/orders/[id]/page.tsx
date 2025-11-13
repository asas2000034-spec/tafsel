"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const orders = {
  "123": {
    id: "123",
    product: "تي شيرت بريميوم",
    design: "تصميم Mesh",
    customer: "سارة الأحمد",
    address: "الرياض، حي النرجس، شارع الملك سعود، فيلا 14",
  },
} as const;

export default function FactoryOrderPage({
  params,
}: {
  params: { id: keyof typeof orders };
}) {
  const router = useRouter();
  const order = orders[params.id];
  const [status, setStatus] = useState<"new" | "in-progress" | "shipped">("new");

  if (!order) {
    router.push("/factory/dashboard");
    return null;
  }

  return (
    <section className="space-y-8 text-right text-white">
      <header className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="self-start rounded-full bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
        >
          ← العودة للطلبات
        </button>
        <h1 className="text-3xl font-bold text-white">
          طلب جديد #{order.id} – {order.product}
        </h1>
        <p className="text-neutral-300">
          تأكد من تنزيل ملف التصميم وبدء الإنتاج والشحن لتفعيل توزيع الأرباح.
        </p>
      </header>

      <div className="space-y-4 rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm text-neutral-300">التصميم</p>
            <p className="text-lg font-semibold text-white">{order.design}</p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-amber-200 hover:text-amber-100"
            >
              تحميل ملف التصميم للطباعة
            </a>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-neutral-300">عنوان الشحن</p>
            <p className="text-lg font-semibold text-white">{order.customer}</p>
            <p className="text-sm text-neutral-200">{order.address}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <button
          type="button"
          onClick={() => setStatus("in-progress")}
          className={`rounded-3xl border px-6 py-5 text-right transition ${
            status !== "new"
              ? "border-emerald-300 bg-emerald-500/20"
              : "border-white/20 bg-white/5 hover:bg-white/10"
          }`}
        >
          <p className="text-lg font-semibold text-white">تأكيد بدء الإنتاج</p>
          <p className="text-sm text-neutral-200">
            يخبر المصمم والعميل أن العمل بدأ.
          </p>
        </button>
        <button
          type="button"
          onClick={() => setStatus("in-progress")}
          className={`rounded-3xl border px-6 py-5 text-right transition ${
            status === "in-progress"
              ? "border-amber-300 bg-amber-500/20"
              : "border-white/20 bg-white/5 hover:bg-white/10"
          }`}
        >
          <p className="text-lg font-semibold text-white">طباعة بوليصة الشحن</p>
          <p className="text-sm text-neutral-200">
            احصل على بوليصة جاهزة بصيغة PDF مع بيانات العميل.
          </p>
        </button>
        <button
          type="button"
          onClick={() => setStatus("shipped")}
          className={`rounded-3xl border px-6 py-5 text-right transition ${
            status === "shipped"
              ? "border-emerald-300 bg-emerald-500/20"
              : "border-white/20 bg-white/5 hover:bg-white/10"
          }`}
        >
          <p className="text-lg font-semibold text-white">تأكيد الشحن</p>
          <p className="text-sm text-neutral-200">
            بعد التأكيد سيتم توزيع الأرباح تلقائياً.
          </p>
        </button>
      </div>

      {status === "shipped" && (
        <div className="rounded-3xl border border-emerald-300 bg-emerald-500/20 px-6 py-4 text-sm font-medium text-emerald-100">
          تم تأكيد الشحن! تم توزيع الأرباح على المصمم والمنصة، وتم تحديث الطلب لدى
          العميل.
        </div>
      )}
    </section>
  );
}
