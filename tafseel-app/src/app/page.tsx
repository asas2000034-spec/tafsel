import Link from "next/link";
import { Card } from "@/components/ui/card";

const focusAreas = [
  {
    title: "مول تفصيل",
    description:
      "تسوّق منتجات ملموسة تحمل هوية المصممين المفضلين لديك مع تجربة دفع سلسة.",
    icon: "🛒",
  },
  {
    title: "NFT لحفظ الحقوق",
    description:
      "نحوّل كل تصميم إلى أصل رقمي موثّق على Polygon لنصون حقوق الملكية.",
    icon: "🔗",
  },
  {
    title: "تفصيل كاش",
    description:
      "محفظة ذكية تدعم الشحن المباشر أو التمويل بالتقسيط المرن (BNPL).",
    icon: "💳",
  },
  {
    title: "التسويق بالعمولة",
    description:
      "أطلق حملاتك التسويقية خلال ثوانٍ وتابع الأداء والعمولات لحظة بلحظة.",
    icon: "📢",
  },
];

const featuredProducts = [
  {
    id: "tshirt-x",
    name: "تي شيرت X - إصدار محدود",
    price: "150 TFT",
    badge: "الأكثر طلباً",
  },
  {
    id: "hoodie-mesh",
    name: "هودي Mesh بلمسة NFT",
    price: "280 TFT",
    badge: "قريباً في المزاد",
  },
  {
    id: "cap-neon",
    name: "كاب Neon",
    price: "95 TFT",
    badge: "متاح الآن",
  },
];

const liveAuctions = [
  {
    title: "لوحة NFT - ارتجال حضري",
    currentBid: "420 TFT",
    endsIn: "ينتهي خلال 3 ساعات",
  },
  {
    title: "تصميم ثلاثي الأبعاد - Galaxy Drop",
    currentBid: "980 TFT",
    endsIn: "ينتهي خلال 12 ساعة",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-neutral-100 via-white to-neutral-200">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,214,150,0.18),_transparent_60%)]" />
      <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-4 pb-24 pt-20 sm:px-10">
        <header className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700">
              تفصيل تجمع كل أطراف صناعة الموضة في مكان واحد
            </span>
            <h1 className="text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl">
              منصة متكاملة للشراء، الإبداع، الإنتاج، والتسويق تحت مظلة واحدة.
            </h1>
            <p className="text-lg text-neutral-600 sm:text-xl">
              استكشف المول، وثّق تصميمك كـ NFT، اربط مع المصانع، وابدأ حملتك
              التسويقية—all في ثلاث خطوات بديهية. المحفظة الذكية تدعم الدفع
              الفوري أو التمويل بالـ BNPL.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-neutral-900/5 transition hover:bg-neutral-700"
              >
                إنشاء حساب
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-8 py-3 text-base font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
              >
                تسجيل الدخول
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500">
              <span>💳 تمويل 0% فائدة عبر BNPL</span>
              <span>🔒 حماية الملكية الفكرية عبر Polygon</span>
              <span>⚡️ لوحة تحكم مخصصة لكل دور</span>
            </div>
          </div>
          <Card className="space-y-6 rounded-3xl bg-white/90 p-8 shadow-xl shadow-amber-100/50">
            <h2 className="text-2xl font-semibold text-neutral-900">
              لماذا تفصيل؟
            </h2>
            <p className="text-neutral-600">
              لأننا نوفّر رحلة واحدة سلسة تربط العميل، المصمم، المصنع، والمسوّق
              عبر تدفق موحد مدعوم بالمحفظة الذكية.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="mt-1 text-lg">🧭</span>
                <div>
                  <p className="font-semibold text-neutral-800">
                    مسار واضح لكل مستخدم
                  </p>
                  <p className="text-sm text-neutral-500">
                    اختر دورك فور التسجيل لتحصل على لوحة التحكم المناسبة لك.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-lg">🤝</span>
                <div>
                  <p className="font-semibold text-neutral-800">
                    شبكة متكاملة من الشركاء
                  </p>
                  <p className="text-sm text-neutral-500">
                    من المصممين إلى المصانع والمسوّقين، كل شيء متصل.
                  </p>
                </div>
              </div>
            </div>
            <Link
              href="#focus-areas"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-500"
            >
              تعرّف على الركائز الأساسية →
            </Link>
          </Card>
        </header>

        <section id="focus-areas" className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-neutral-900">
              ركائز تفصيل الأربعة
            </h2>
            <p className="text-neutral-600">
              كل ركيزة تمثل رحلة متكاملة تبدأ من شاشة واحدة واضحة.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {focusAreas.map((item) => (
              <Card key={item.title} className="space-y-3">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="text-lg font-semibold text-neutral-800">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-500">{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-neutral-900">
              منتجات مختارة من المول
            </h2>
            <p className="text-neutral-600">
              تمت الموافقة عليها من قبل المصانع، جاهزة للشحن السريع.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="space-y-4">
                <div className="flex items-center justify-between text-sm text-amber-600">
                  <span>{product.badge}</span>
                  <span>{product.price}</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800">
                  {product.name}
                </h3>
                <Link
                  href={`/app/product/${product.id}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-amber-600"
                >
                  استكشف المنتج →
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Card className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-neutral-900">
                مزادات حية الآن
              </h2>
              <span className="rounded-full bg-neutral-900 px-4 py-1 text-sm font-semibold text-white">
                بث مباشر
              </span>
            </div>
            <div className="space-y-4">
              {liveAuctions.map((auction) => (
                <div
                  key={auction.title}
                  className="flex flex-col gap-2 rounded-2xl bg-neutral-50 p-4"
                >
                  <p className="text-lg font-semibold text-neutral-800">
                    {auction.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
                    <span>العرض الحالي: {auction.currentBid}</span>
                    <span className="text-emerald-600">{auction.endsIn}</span>
                  </div>
                  <Link
                    href="/app/auctions"
                    className="text-sm font-semibold text-amber-600 hover:text-amber-500"
                  >
                    انضم للمزاد →
                  </Link>
                </div>
              ))}
            </div>
          </Card>
          <Card className="space-y-4 bg-neutral-900 text-white">
            <h2 className="text-xl font-semibold">تفصيل كاش</h2>
            <p className="text-sm text-neutral-200">
              شحن فوري عبر مدى وآبل باي أو تمويل BNPL من تابي/تمارا مع تقسيم
              تلقائي 70٪ رصيد حر و30٪ رصيد مقفل للمنصة.
            </p>
            <Link
              href="/app/wallet"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200"
            >
              جرّب المحفظة الذكية →
            </Link>
          </Card>
        </section>
      </main>
    </div>
  );
}
