import { notFound } from "next/navigation";

const campaigns = {
  "cmp-1": {
    id: "cmp-1",
    name: "تي شيرت المصمم خالد",
    summary: "حملة ترويجية باستخدام إنستغرام وسناب شات.",
  },
  "cmp-2": {
    id: "cmp-2",
    name: "مزاد Galaxy Drop",
    summary: "حملة مخصصة لهواة الـ NFT عبر تويتر.",
  },
} as const;

export default function CampaignDetails({
  params,
}: {
  params: { id: keyof typeof campaigns };
}) {
  const campaign = campaigns[params.id];
  if (!campaign) {
    notFound();
  }

  return (
    <section className="space-y-4 text-right">
      <h1 className="text-3xl font-bold text-neutral-900">{campaign.name}</h1>
      <p className="text-neutral-600">{campaign.summary}</p>
      <p className="rounded-3xl bg-neutral-100 px-4 py-3 text-sm text-neutral-500">
        سيتم لاحقاً عرض تفاصيل الأداء المتقدمة (المصادر، التحويلات، المستهدفات).
      </p>
    </section>
  );
}
