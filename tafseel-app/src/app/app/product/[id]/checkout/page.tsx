"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/app/providers";
import { Card } from "@/components/ui/card";

const products = {
  "tshirt-x": {
    id: "tshirt-x",
    name: "تي شيرت X - إصدار محدود",
    price: 200,
  },
  "hoodie-mesh": {
    id: "hoodie-mesh",
    name: "هودي Mesh بلمسة NFT",
    price: 280,
  },
  "cap-neon": {
    id: "cap-neon",
    name: "كاب Neon",
    price: 95,
  },
  "jacket-night": {
    id: "jacket-night",
    name: "جاكيت Night Rider",
    price: 420,
  },
} as const;

export default function CheckoutPage({
  params,
}: {
  params: { id: keyof typeof products };
}) {
  const product = products[params.id];
  const router = useRouter();
  const { state, purchase } = useWallet();
  const [error, setError] = useState<string | null>(null);

  const paymentPreview = useMemo(() => {
    const amount = product?.price ?? 0;
    const lockedUsage = Math.min(state.locked, amount);
    const remaining = amount - lockedUsage;
    const freeUsage = Math.min(state.free, remaining);
    return { lockedUsage, freeUsage };
  }, [product?.price, state.free, state.locked]);

  if (!product) {
    router.push("/app/mall");
    return null;
  }

  const handleConfirm = () => {
    setError(null);
    const success = purchase(product.price);
    if (!success) {
      setError("الرصيد غير كافٍ. فضلاً اشحن المحفظة قبل إتمام الشراء.");
      return;
    }
    router.push("/app/wallet?status=purchase-success");
  };

  return (
    <section className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold text-neutral-500">تأكيد الدفع</p>
        <h1 className="text-3xl font-bold text-neutral-900">
          مراجعة الطلب قبل الدفع
        </h1>
        <p className="text-neutral-600">
          سنخصم من رصيدك المقفل {paymentPreview.lockedUsage} TFT أولاً، ثم من
          الرصيد الحر {paymentPreview.freeUsage} TFT عند الحاجة.
        </p>
      </header>

      <Card className="space-y-6 rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-500">المنتج</p>
            <h2 className="text-xl font-semibold text-neutral-900">
              {product.name}
            </h2>
          </div>
          <span className="text-lg font-bold text-neutral-900">
            {product.price} TFT
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            سيتم خصم {paymentPreview.lockedUsage} TFT من الرصيد المقفل.
          </div>
          <div className="rounded-3xl bg-neutral-100 px-4 py-3 text-sm text-neutral-600">
            وسيتم خصم {paymentPreview.freeUsage} TFT من الرصيد الحر إذا لزم الأمر.
          </div>
        </div>

        <div className="space-y-2 rounded-3xl bg-neutral-50 px-4 py-4 text-sm text-neutral-500">
          <p>إجمالي الرصيد الحالي: {state.total} TFT</p>
          <p>الرصيد الحر: {state.free} TFT</p>
          <p>الرصيد المقفل: {state.locked} TFT</p>
        </div>

        {error && (
          <p className="rounded-3xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 rounded-full bg-neutral-900 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-neutral-700"
          >
            تأكيد الدفع
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 rounded-full border border-neutral-300 px-6 py-3 text-base font-semibold text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            العودة للمنتج
          </button>
        </div>
      </Card>
    </section>
  );
}
