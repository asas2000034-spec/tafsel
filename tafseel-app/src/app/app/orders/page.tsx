import { Card } from "@/components/ui/card";

const orders = [
  {
    id: "123",
    name: "تي شيرت X - إصدار محدود",
    status: "قيد التنفيذ من المصنع",
    estimatedDelivery: "يصل خلال 5 أيام",
  },
  {
    id: "122",
    name: "كاب Neon",
    status: "تم الشحن",
    estimatedDelivery: "يصل خلال يومين",
  },
];

export default function OrdersPage() {
  return (
    <section className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold text-blue-600">طلباتي</p>
        <h1 className="text-3xl font-bold text-neutral-900">
          تتبّع تقدم طلباتك اللحظي.
        </h1>
        <p className="text-neutral-600">
          مصنعونا يحدّثون حالة الطلب فور بدء الإنتاج وحتى تأكيد الشحن.
        </p>
      </header>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="flex flex-col gap-3 rounded-3xl border border-blue-100 bg-gradient-to-l from-blue-50/80 via-white to-white"
          >
            <div className="flex items-center justify-between text-sm text-blue-700">
              <span>طلب #{order.id}</span>
              <span>{order.estimatedDelivery}</span>
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">
              {order.name}
            </h2>
            <p className="text-sm font-medium text-blue-600">{order.status}</p>
            <p className="text-sm text-neutral-500">
              سيتم تجربة خصم الرصيد المقفل أولاً. في حال وجود فرق سيتم خصمه من
              الرصيد الحر.
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
