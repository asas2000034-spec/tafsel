import { Card } from "@/components/ui/card";

const auctions = [
  {
    id: "auction-1",
    title: "تصميم NFT - زخم رقمي",
    designer: "الاستوديو الرقمي",
    currentBid: 420,
    endsIn: "ينتهي خلال 3 ساعات",
  },
  {
    id: "auction-2",
    title: "لوحة ثلاثية الأبعاد - Galaxy Drop",
    designer: "المصمم طلال",
    currentBid: 980,
    endsIn: "ينتهي خلال 12 ساعة",
  },
];

export default function AuctionsPage() {
  return (
    <section className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold text-purple-600">المزاد</p>
        <h1 className="text-3xl font-bold text-neutral-900">
          أصول رقمية حصرية بنظام المزايدة.
        </h1>
        <p className="text-neutral-600">
          تابع مزادات NFT الحية وشارك قبل انتهاء الوقت. تم التحقق من كل تصميم
          عبر بلوك تشين Polygon.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {auctions.map((auction) => (
          <Card key={auction.id} className="space-y-4 rounded-3xl">
            <div className="flex items-center justify-between text-sm text-purple-600">
              <span>{auction.endsIn}</span>
              <span>{auction.currentBid} TFT</span>
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">
              {auction.title}
            </h2>
            <p className="text-sm text-neutral-500">تصميم: {auction.designer}</p>
            <p className="rounded-2xl bg-purple-50 px-4 py-3 text-sm text-purple-700">
              قم بالمزايدة الآن واربح التصميم الرقمي كاملاً مع إمكانية ربطه
              بمنتج ملموس لاحقاً.
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
