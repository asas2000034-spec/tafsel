"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useWallet } from "@/app/providers";
import { Card } from "@/components/ui/card";

const products = {
  "tshirt-x": {
    id: "tshirt-x",
    name: "تي شيرت X - إصدار محدود",
    designer: "المصمم خالد",
    description:
      "تي شيرت قطني فاخر بطبعة NFT أصلية تم توثيقها على Polygon. الإنتاج يتم بالتعاون مع مصنع بريميوم.",
    price: 200,
  },
  "hoodie-mesh": {
    id: "hoodie-mesh",
    name: "هودي Mesh بلمسة NFT",
    designer: "المصممة ليان",
    description:
      "هودي مرن مع طبعة رقمية متوهجة. يوفر المصنع ضمان جودة من الدرجة الأولى.",
    price: 280,
  },
  "cap-neon": {
    id: "cap-neon",
    name: "كاب Neon",
    designer: "الاستوديو الرقمي",
    description:
      "كاب عصري بلمسات مضيئة، تم اعتماده ليكون المنتج الرسمي لحملة الصيف.",
    price: 95,
  },
  "jacket-night": {
    id: "jacket-night",
    name: "جاكيت Night Rider",
    designer: "المصمم سامي",
    description:
      "جاكيت مقاوم للعوامل الجوية مع دمج NFC لنقل بيانات الـ NFT مباشرة.",
    price: 420,
  },
} satisfies Record<string, { id: string; name: string; designer: string; description: string; price: number }>;

export default function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const product = products[params.id];
  const router = useRouter();
  const { state } = useWallet();

  if (!product) {
    notFound();
  }

  return (
    <section className="space-y-10">
      <Link
        href="/app/mall"
        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-neutral-900"
      >
        ← العودة للمول
      </Link>

      <Card className="grid gap-10 rounded-3xl p-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white">
              تصميم موثّق كـ NFT
            </span>
            <h1 className="text-4xl font-bold text-neutral-900">
              {product.name}
            </h1>
            <p className="text-neutral-600">{product.description}</p>
          </div>
          <div className="space-y-2 rounded-3xl bg-neutral-100 px-4 py-4">
            <p className="text-sm text-neutral-500">المصمم</p>
            <p className="text-lg font-semibold text-neutral-900">
              {product.designer}
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl bg-neutral-900 px-6 py-6 text-white">
            <p className="text-sm text-neutral-300">السعر</p>
            <p className="mt-2 text-4xl font-bold">{product.price} TFT</p>
            <p className="mt-3 text-sm text-neutral-200">
              سيتم خصم الرصيد المقفل لديك أولاً ثم يتم استكمال بقية المبلغ من
              الرصيد الحر.
            </p>
          </div>
          <Card className="rounded-3xl bg-neutral-50">
            <h2 className="text-lg font-semibold text-neutral-900">
              حالة محفظتك الحالية
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600">
              <li>إجمالي الرصيد: {state.total} TFT</li>
              <li>الرصيد الحر: {state.free} TFT</li>
              <li>الرصيد المقفل: {state.locked} TFT</li>
            </ul>
            <p className="mt-4 text-xs text-neutral-400">
              يمكنك العودة للمحفظة لشحنها قبل إتمام الشراء.
            </p>
          </Card>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() =>
                router.push(`/app/product/${product.id}/checkout`)
              }
              className="rounded-full bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-emerald-500"
            >
              اشتر الآن
            </button>
            <button
              type="button"
              onClick={() => router.push("/app/wallet")}
              className="rounded-full border border-neutral-300 px-6 py-3 text-base font-semibold text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
            >
              شحن المحفظة أولاً
            </button>
          </div>
        </div>
      </Card>
    </section>
  );
}
