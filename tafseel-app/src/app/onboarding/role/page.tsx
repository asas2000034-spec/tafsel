"use client";

import { useRouter } from "next/navigation";

const roles = [
  {
    key: "customer",
    title: "أنا عميل / مشتري",
    description: "أبحث عن منتجات مميزة واستثمارات موثوقة داخل المنصة.",
    icon: "🛒",
    destination: "/app/mall",
  },
  {
    key: "designer",
    title: "أنا مصمم / مبدع",
    description: "أريد توثيق تصاميمي كـ NFT وبيعها كمنتجات ملموسة.",
    icon: "✏️",
    destination: "/designer/dashboard",
  },
  {
    key: "factory",
    title: "أنا مصنع / مزود خدمة",
    description: "أوفّر خدمات الإنتاج وأحتاج لوحة عمليات واضحة.",
    icon: "🏭",
    destination: "/factory/dashboard",
  },
  {
    key: "marketer",
    title: "أنا مسوّق / وكالة",
    description: "أرغب في إنشاء روابط تتبع وتحقيق عمولات.",
    icon: "📢",
    destination: "/marketer/dashboard",
  },
];

export default function RoleSelectionPage() {
  const router = useRouter();

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 px-4 pb-24 pt-16 sm:px-6">
      <header className="space-y-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-1 text-sm font-semibold text-white">
          خطوة 2 من 2
        </span>
        <h1 className="text-4xl font-bold text-neutral-900">
          أهلاً بك في تفصيل! اختر دورك الأساسي:
        </h1>
        <p className="mx-auto max-w-2xl text-neutral-600">
          اختيارك سيفتح لوحة تحكم مصممة خصيصاً لتجربتك. يمكنك لاحقاً إضافة أدوار
          أخرى، لكن نحتاج الآن لمعرفة نقطة انطلاقك.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        {roles.map((role) => (
          <button
            key={role.key}
            type="button"
            onClick={() => router.push(role.destination)}
            className="group flex h-full flex-col items-start gap-4 rounded-3xl border border-neutral-200 bg-white p-8 text-right transition hover:-translate-y-1 hover:border-neutral-900 hover:shadow-xl"
          >
            <span className="text-4xl">{role.icon}</span>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-neutral-900">
                {role.title}
              </h2>
              <p className="text-neutral-600">{role.description}</p>
            </div>
            <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 transition group-hover:text-amber-600">
              اختر هذا الدور
              <span aria-hidden>→</span>
            </span>
          </button>
        ))}
      </section>
    </main>
  );
}
