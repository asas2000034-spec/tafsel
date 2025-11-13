import Link from "next/link";
import { Card } from "@/components/ui/card";

const products = [
  {
    id: "tshirt-x",
    name: "تي شيرت X - إصدار محدود",
    designer: "المصمم خالد",
    price: 150,
    badge: "متاح للشحن خلال 48 ساعة",
  },
  {
    id: "hoodie-mesh",
    name: "هودي Mesh بلمسة NFT",
    designer: "المصممة ليان",
    price: 280,
    badge: "تخفيضات إطلاق المنصة",
  },
  {
    id: "cap-neon",
    name: "كاب Neon",
    designer: "الاستوديو الرقمي",
    price: 95,
    badge: "إصدار صيف 2025",
  },
  {
    id: "jacket-night",
    name: "جاكيت Night Rider",
    designer: "المصمم سامي",
    price: 420,
    badge: "متاح بنظام الطلب المسبق",
  },
];

export default function MallPage() {
  return (
    <section className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold text-amber-600">المول</p>
        <h1 className="text-3xl font-bold text-neutral-900">
          مرحباً بك! جاهز لاختيار أول منتجاتك؟
        </h1>
        <p className="text-neutral-600">
          استكشف منتجات ملموسة تم توثيق تصاميمها كـ NFT وتعاقدت مع مصانع موثوقة.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col gap-4 rounded-3xl">
            <div className="flex items-center justify-between text-sm text-emerald-600">
              <span>{product.badge}</span>
              <span>{product.price} TFT</span>
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">
              {product.name}
            </h2>
            <p className="text-sm text-neutral-500">تصميم: {product.designer}</p>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-sm text-neutral-500">
                الدفع المرن متاح عبر BNPL
              </span>
              <Link
                href={`/app/product/${product.id}`}
                className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700"
              >
                اشتر الآن
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
