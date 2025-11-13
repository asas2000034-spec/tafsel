import Link from "next/link";
import { Card } from "@/components/ui/card";

const stats = [
  { label: "أرباح الشهر", value: "2,450 TFT" },
  { label: "التصاميم المفعّلة", value: "8" },
  { label: "طلبات قيد الإنتاج", value: "3" },
];

const designs = [
  {
    id: "mesh",
    name: "تصميم Mesh – هودي",
    status: "مفعل في المول",
    mode: "Store Mode",
  },
  {
    id: "galaxy",
    name: "Galaxy Drop – NFT",
    status: "قيد المزاد",
    mode: "Auction Mode",
  },
  {
    id: "urban",
    name: "Urban Lines – تي شيرت",
    status: "بانتظار موافقة المصنع",
    mode: "Store Mode",
  },
];

export default function DesignerDashboard() {
  return (
    <>
      <header className="flex flex-col gap-4 text-right">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-neutral-900">
              أهلاً بك أيها المصمم!
            </h1>
            <p className="max-w-xl text-neutral-600">
              راقب أداء تصاميمك، ارفع أعمالاً جديدة، وربطها بالمصانع المناسبة
              بضغطة واحدة.
            </p>
          </div>
          <Link
            href="/designer/upload"
            className="flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-neutral-700"
          >
            + رفع تصميم جديد (Auto-Mint)
          </Link>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="rounded-3xl bg-white/90 text-right shadow-lg ring-1 ring-purple-100"
          >
            <p className="text-sm text-neutral-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-neutral-900">
              {stat.value}
            </p>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-900">تصاميمي</h2>
        <div className="space-y-4">
          {designs.map((design) => (
            <Card
              key={design.id}
              className="flex flex-col gap-3 rounded-3xl border border-purple-100 bg-gradient-to-l from-purple-50 via-white to-white"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-neutral-900">
                    {design.name}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    نمط البيع: {design.mode}
                  </p>
                </div>
                <span className="rounded-full bg-purple-100 px-4 py-1 text-sm font-semibold text-purple-700">
                  {design.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-neutral-500">
                <span>حقوق NFT محفوظة على Polygon</span>
                <span>تمت الموافقة من المصنع الشريك</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
