"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type BlankProduct = {
  id: string;
  name: string;
  baseCost: number;
};

const blankProducts: BlankProduct[] = [
  { id: "premium-tee", name: "تي شيرت بريميوم", baseCost: 50 },
  { id: "organic-hoodie", name: "هودي عضوي", baseCost: 70 },
  { id: "ceramic-mug", name: "كوب سيراميك فاخر", baseCost: 28 },
];

const factories = [
  { id: "factory-a", name: "مصنع الدانة", leadTime: "شحن خلال 3-5 أيام" },
  { id: "factory-b", name: "مصنع النساجون", leadTime: "شحن خلال 5-7 أيام" },
  { id: "factory-c", name: "مصنع الطباعة الذكية", leadTime: "شحن خلال 2-4 أيام" },
];

const COMMISSION_RATE = 0.2; // نسبة العرض الترويجي الحالية (خصم 10% من العمولة القياسية 30%)

export default function StoreModeSetupPage() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<BlankProduct>(
    blankProducts[0],
  );
  const [selectedFactory, setSelectedFactory] = useState(factories[0].id);
  const [profit, setProfit] = useState(75);

  const pricing = useMemo(() => {
    const commission = Math.round(
      (selectedProduct.baseCost + profit) * COMMISSION_RATE,
    );
    const finalPrice = selectedProduct.baseCost + profit + commission;
    return { commission, finalPrice };
  }, [profit, selectedProduct.baseCost]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/designer/success");
  };

  return (
    <section className="space-y-8 text-right">
      <header className="space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-1 text-sm font-semibold text-white">
          إعداد المنتج للمتجر
        </span>
        <h1 className="text-3xl font-bold text-neutral-900">
          اربط تصميمك بالمصنع وحدد السعر النهائي
        </h1>
        <p className="text-neutral-600">
          اختر منتجاً خاماً، ثم مصنعاً معتمداً، وأدخل ربحك المتوقع. سنحسب عمولة
          تفصيل تلقائياً ونظهر السعر النهائي للعملاء.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-3xl border border-neutral-200 bg-white/90 p-8 shadow-lg"
      >
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900">
            الخطوة 1: اختر المنتج الخام
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {blankProducts.map((product) => {
              const isActive = product.id === selectedProduct.id;
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className={`flex h-full flex-col gap-2 rounded-3xl border px-4 py-4 text-right transition ${
                    isActive
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 hover:border-neutral-900"
                  }`}
                >
                  <span className="text-lg font-semibold">{product.name}</span>
                  <span className="text-sm">
                    تكلفة المصنع: {product.baseCost} TFT
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900">
            الخطوة 2: اختر المصنع
          </h2>
          <select
            value={selectedFactory}
            onChange={(event) => setSelectedFactory(event.target.value)}
            className="w-full rounded-3xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
          >
            {factories.map((factory) => (
              <option key={factory.id} value={factory.id}>
                {factory.name} – {factory.leadTime}
              </option>
            ))}
          </select>
          <p className="text-sm text-neutral-500">
            المصنع المختار سيستقبل الطلبات تلقائياً ويقوم بتحديث حالة التنفيذ.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900">
            الخطوة 3: تحديد السعر
          </h2>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl bg-neutral-100 px-4 py-4">
              <p className="text-sm text-neutral-500">تكلفة المصنع</p>
              <p className="text-xl font-semibold text-neutral-900">
                {selectedProduct.baseCost} TFT
              </p>
            </div>
            <div className="rounded-3xl bg-amber-50 px-4 py-4">
              <p className="text-sm text-neutral-500">
                عمولة تفصيل (30% - عرض إطلاق 20%)
              </p>
              <p className="text-xl font-semibold text-amber-700">
                {pricing.commission} TFT
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-500">ربحك</label>
              <input
                type="number"
                min={30}
                step={5}
                value={profit}
                onChange={(event) => setProfit(Number(event.target.value))}
                className="w-full rounded-3xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
              />
            </div>
          </div>

          <div className="rounded-3xl bg-neutral-900 px-6 py-6 text-white">
            <p className="text-sm text-neutral-300">السعر النهائي للعميل</p>
            <p className="mt-2 text-4xl font-bold">{pricing.finalPrice} TFT</p>
            <p className="mt-3 text-sm text-neutral-200">
              سيتم عرض هذا السعر في المول، مع إبراز أن الطلب يتضمن تصنيعاً حسب
              الطلب من {factories.find((f) => f.id === selectedFactory)?.name}.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="submit"
            className="rounded-full bg-neutral-900 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-neutral-700"
          >
            نشر في المول
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full border border-neutral-300 px-6 py-3 text-base font-semibold text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            رجوع
          </button>
        </div>
      </form>
    </section>
  );
}
