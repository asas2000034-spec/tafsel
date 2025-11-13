import Link from "next/link";
import { Card } from "@/components/ui/card";

const stats = [
  { label: "الأرباح الإجمالية", value: "1,120 TFT" },
  { label: "النقرات هذا الأسبوع", value: "8,340" },
  { label: "المبيعات المحالة", value: "96" },
];

const campaigns = [
  {
    id: "cmp-1",
    name: "تي شيرت المصمم خالد",
    status: "نشطة",
    clicks: 4200,
    conversions: 36,
  },
  {
    id: "cmp-2",
    name: "مزاد Galaxy Drop",
    status: "تنتهي خلال يومين",
    clicks: 3200,
    conversions: 24,
  },
];

export default function MarketerDashboardPage() {
  return (
    <>
      <header className="flex flex-col gap-4 text-right">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-neutral-900">
              لوحة تحكم المسوّق
            </h1>
            <p className="max-w-xl text-neutral-600">
              تابع أداء حملاتك التسويقية وابدأ حملات جديدة للترويج لمنتجات المول أو
              المزاد.
            </p>
          </div>
          <Link
            href="/marketer/campaigns/new"
            className="rounded-full bg-neutral-900 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-neutral-700"
          >
            + إنشاء حملة جديدة
          </Link>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="rounded-3xl border border-amber-100 bg-white/90 text-right shadow-lg"
          >
            <p className="text-sm text-neutral-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-neutral-900">
              {stat.value}
            </p>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-900">حملاتي</h2>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="flex flex-col gap-3 rounded-3xl border border-amber-100 bg-white p-6 text-right"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900">
                    {campaign.name}
                  </h3>
                  <p className="text-sm text-neutral-500">{campaign.status}</p>
                </div>
                <Link
                  href={`/marketer/campaigns/${campaign.id}`}
                  className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700"
                >
                  عرض التفاصيل
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                <span>النقرات: {campaign.clicks}</span>
                <span>المبيعات: {campaign.conversions}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
