import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function DesignerSuccessPage() {
  return (
    <section className="space-y-8 text-right">
      <Card className="space-y-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-neutral-100 p-10 shadow-xl">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-4xl">🎉</span>
          <h1 className="text-3xl font-bold text-neutral-900">
            تهانينا! تصميمك معروض الآن في المول.
          </h1>
          <p className="max-w-2xl text-neutral-600">
            تم إرسال تفاصيل المنتج إلى المصنع المختار، وتم تفعيل صفحة المنتج في مول
            تفصيل. ستتلقى تنبيهاً عند أول طلب جديد.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-3xl bg-white text-center shadow-none">
            <p className="text-sm text-neutral-500">المصنع المختار</p>
            <p className="mt-2 text-lg font-semibold text-neutral-900">
              مصنع الدانة
            </p>
          </Card>
          <Card className="rounded-3xl bg-white text-center shadow-none">
            <p className="text-sm text-neutral-500">السعر المنشور للعميل</p>
            <p className="mt-2 text-lg font-semibold text-neutral-900">
              150 TFT
            </p>
          </Card>
          <Card className="rounded-3xl bg-white text-center shadow-none">
            <p className="text-sm text-neutral-500">الوضع الحالي</p>
            <p className="mt-2 text-lg font-semibold text-emerald-600">
              نشط في المول
            </p>
          </Card>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/app/mall"
            className="rounded-full bg-neutral-900 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-neutral-700"
          >
            عرض المنتج كما يراه العملاء
          </Link>
          <Link
            href="/designer/dashboard"
            className="rounded-full border border-neutral-300 px-6 py-3 text-base font-semibold text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            العودة للوحة التحكم
          </Link>
        </div>
      </Card>
    </section>
  );
}
