"use client";

import { useRouter } from "next/navigation";

export default function DesignerDualChoicePage() {
  const router = useRouter();

  return (
    <section className="space-y-10 text-right">
      <header className="space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">
          تم التوثيق بنجاح
        </span>
        <h1 className="text-3xl font-bold text-neutral-900">
          رائع! تم توثيق تصميمك. كيف تريد بيعه؟
        </h1>
        <p className="text-neutral-600">
          اختر القناة التي تناسب استراتيجيتك. يمكنك لاحقاً تفعيل الخيار الآخر
          أيضاً.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <button
          type="button"
          onClick={() => router.push("/designer/store-setup")}
          className="group flex h-full flex-col gap-4 rounded-3xl border border-neutral-200 bg-white/90 p-8 text-right transition hover:-translate-y-1 hover:border-neutral-900 hover:shadow-xl"
        >
          <span className="text-4xl">🛒</span>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-neutral-900">
              البيع كمنتج ملموس (Store Mode)
            </h2>
            <p className="text-neutral-600">
              اربط تصميمك بمنتج خام جاهز من المصانع، وحدد ربحك النهائي ليظهر المنتج
              فوراً في مول تفصيل.
            </p>
          </div>
          <span className="mt-auto text-sm font-semibold text-neutral-500 transition group-hover:text-emerald-600">
            البدء في إعداد المنتج →
          </span>
        </button>

        <button
          type="button"
          onClick={() => router.push("/app/auctions")}
          className="group flex h-full flex-col gap-4 rounded-3xl border border-purple-200 bg-purple-50/80 p-8 text-right transition hover:-translate-y-1 hover:border-purple-600 hover:shadow-xl"
        >
          <span className="text-4xl">🏆</span>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-neutral-900">
              البيع كأصل رقمي (Auction Mode)
            </h2>
            <p className="text-neutral-600">
              فعّل المزاد الرقمي واسمح للمجمعين بالمزايدة على NFT الخاص بك. يمكنك
              لاحقاً تحويله لمنتج ملموس بعد بيع المزاد.
            </p>
          </div>
          <span className="mt-auto text-sm font-semibold text-neutral-500 transition group-hover:text-purple-700">
            الانتقال إلى المزادات →
          </span>
        </button>
      </div>
    </section>
  );
}
