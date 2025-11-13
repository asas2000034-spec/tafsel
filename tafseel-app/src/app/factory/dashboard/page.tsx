import Link from "next/link";
import { Card } from "@/components/ui/card";

const orders = [
  {
    id: "123",
    product: "تي شيرت بريميوم",
    designer: "تصميم Mesh",
    status: "طلب جديد",
    createdAt: "اليوم",
  },
  {
    id: "120",
    product: "كوب سيراميك فاخر",
    designer: "تصميم Minimal Waves",
    status: "قيد الإنتاج",
    createdAt: "منذ 3 ساعات",
  },
];

export default function FactoryDashboard() {
  return (
    <>
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">لوحة تحكم المصنع</h1>
          <p className="text-sm text-neutral-300">
            تابع الطلبات القادمة من المصممين، وقم بإدارة الكتالوج والمحفظة في مكان
            واحد.
          </p>
        </div>
        <nav className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/10 px-4 py-2 text-white">
            الطلبات (أنت هنا)
          </span>
          <Link
            href="/factory/catalog"
            className="rounded-full bg-white px-4 py-2 text-neutral-900 transition hover:bg-amber-200"
          >
            كتالوجي
          </Link>
          <Link
            href="/app/wallet"
            className="rounded-full bg-white px-4 py-2 text-neutral-900 transition hover:bg-amber-200"
          >
            المحفظة
          </Link>
        </nav>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">الطلبات الجديدة</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <Card
              key={order.id}
              className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 text-right text-white"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm text-neutral-300">
                    طلب #{order.id} • {order.createdAt}
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    {order.product} – {order.designer}
                  </h3>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-200">
                  {order.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-200">
                <span>يحتاج لتأكيد بدء الإنتاج خلال 12 ساعة.</span>
                <Link
                  href={`/factory/orders/${order.id}`}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-amber-200"
                >
                  فتح الطلب
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
