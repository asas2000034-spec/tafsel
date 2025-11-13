import Link from "next/link";
import { Card } from "@/components/ui/card";

const blanks = [
  {
    id: "premium-tee",
    name: "تي شيرت بريميوم",
    baseCost: 50,
    colors: ["أسود", "أبيض", "رمادي"],
  },
  {
    id: "organic-hoodie",
    name: "هودي عضوي",
    baseCost: 70,
    colors: ["أسود", "أخضر زيتوني"],
  },
];

export default function FactoryCatalogPage() {
  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">كتالوج المنتجات الخام</h1>
          <p className="text-sm text-neutral-300">
            أضف منتجات خام جديدة ليتمكن المصممون من ربط تصاميمهم بها فوراً.
          </p>
        </div>
        <Link
          href="/factory/catalog/new"
          className="rounded-full bg-white px-6 py-3 text-base font-semibold text-neutral-900 transition hover:bg-amber-200"
        >
          + إضافة منتج خام جديد
        </Link>
      </header>

      <div className="space-y-4">
        {blanks.map((blank) => (
          <Card
            key={blank.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 text-right text-white"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-white">{blank.name}</h2>
                <p className="text-sm text-neutral-300">
                  التكلفة الأساسية: {blank.baseCost} TFT
                </p>
              </div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                الألوان المتاحة: {blank.colors.join("، ")}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
