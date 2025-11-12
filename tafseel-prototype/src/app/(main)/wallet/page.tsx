"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { walletActivity } from "@/data/mock";
import { useLanguage } from "@/providers/language-provider";
import { motion } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Wallet2,
} from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  }),
};

export default function WalletPage() {
  const { language, messages } = useLanguage();

  return (
    <div className="space-y-14">
      <motion.section
        variants={fade}
        initial="hidden"
        animate="visible"
        className="rounded-[3rem] border border-border/30 bg-surface/95 p-10 shadow-card"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-text md:text-4xl">
              {messages.wallet.title}
            </h1>
            <p className="max-w-2xl text-base text-text-muted md:text-lg">
              {messages.wallet.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary">
            <Wallet2 className="h-4 w-4" />
            TFT • 1 : 1 • SAR
          </div>
        </div>
      </motion.section>

      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-6">
          <Card className="overflow-hidden">
            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-text-muted">
                      {messages.wallet.balance.label}
                    </p>
                    <p className="text-4xl font-black text-text">18,450 TFT</p>
                  </div>
                  <motion.div
                    className="relative h-20 w-20"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute inset-0 rounded-full border-2 border-primary/40" />
                    <div className="absolute inset-3 rounded-full border-2 border-accent/50" />
                    <div className="absolute inset-1.5 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-accent/30 text-lg font-black text-primary">
                      TFT
                    </div>
                  </motion.div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/30 bg-background/80 p-4">
                    <p className="text-xs uppercase tracking-wide text-text-muted">
                      {messages.wallet.balance.tft}
                    </p>
                    <p className="mt-1 text-xl font-semibold text-text">18,450</p>
                  </div>
                  <div className="rounded-2xl border border-border/30 bg-background/80 p-4">
                    <p className="text-xs uppercase tracking-wide text-text-muted">
                      {messages.wallet.balance.sar}
                    </p>
                    <p className="mt-1 text-xl font-semibold text-text">18,450 SAR</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button size="sm">
                    <CreditCard className="h-4 w-4" />
                    {messages.wallet.actions.deposit}
                  </Button>
                  <Button variant="accent" size="sm">
                    <DollarSign className="h-4 w-4" />
                    {messages.wallet.actions.convert}
                  </Button>
                  <Button variant="ghost" size="sm">
                    {messages.wallet.actions.bnpl}
                  </Button>
                </div>
              </div>
              <div className="rounded-3xl border border-border/30 bg-gradient-to-br from-primary/15 via-background/70 to-accent/15 p-6">
                <p className="text-sm font-semibold text-text-muted">
                  {language === "ar" ? "شبكات موصولة" : "Connected rails"}
                </p>
                <div className="mt-4 space-y-3 text-sm text-text">
                  <div className="flex items-center justify-between rounded-2xl border border-border/30 bg-background/80 px-4 py-3">
                    <span>Tap</span>
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                      Live
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-border/30 bg-background/80 px-4 py-3">
                    <span>Tamara</span>
                    <span className="text-xs text-text-muted">
                      {language === "ar" ? "مزامنة" : "Syncing"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-border/30 bg-background/80 px-4 py-3">
                    <span>Taby</span>
                    <span className="text-xs text-text-muted">
                      {language === "ar" ? "تفعيل" : "Activating"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text">
                {messages.wallet.activity.title}
              </h2>
              <Button variant="ghost" size="sm">
                {language === "ar" ? "تصدير" : "Export"}
              </Button>
            </div>
            <div className="mt-5 space-y-4 text-sm">
              {walletActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between rounded-2xl border border-border/30 bg-background/80 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-text">
                      {activity.label[language]}
                    </p>
                    <p className="text-xs text-text-muted">{activity.timestamp}</p>
                  </div>
                  <span
                    className="inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: activity.type === "credit" ? "rgb(34 197 94)" : "rgb(248 113 113)" }}
                  >
                    {activity.type === "credit" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownLeft className="h-4 w-4" />
                    )}
                    {activity.amount}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="space-y-6">
          <Card className="h-full">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-wide text-text-muted">
                {language === "ar" ? "قنوات السداد" : "Settlement channels"}
              </p>
              <div className="rounded-3xl border border-border/30 bg-background/80 p-5">
                <p className="text-sm font-semibold text-text">
                  {language === "ar"
                    ? "قسّم الإيرادات بين المصنع والمصمم"
                    : "Split revenue between factory and designer"}
                </p>
                <p className="mt-2 text-xs text-text-muted">
                  {language === "ar"
                    ? "تتم التسوية عبر العقود الذكية مع تحكم لحظي في نسب العوائد."
                    : "Smart contracts settle instantly with real-time royalty sliders."}
                </p>
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-2xl border border-border/30 bg-surface/80 px-4 py-3">
                    <span>{language === "ar" ? "حصة المصمم" : "Designer share"}</span>
                    <span className="font-semibold text-text">65%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-border/30 bg-surface/80 px-4 py-3">
                    <span>{language === "ar" ? "حصة المصنع" : "Factory share"}</span>
                    <span className="font-semibold text-text">35%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-primary/20 via-background/80 to-accent/20 text-center">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-text">
                {language === "ar"
                  ? "مزامنة TFT مع شبكة Polygon"
                  : "Sync TFT with Polygon network"}
              </h3>
              <p className="text-sm text-text-muted">
                {language === "ar"
                  ? "أنشئ قنوات دفع بين التفصيل مول وسوق الرموز مباشرة."
                  : "Create payment channels between Tafseel Mall and the NFT marketplace instantly."}
              </p>
              <Button size="lg" className="w-full">
                {language === "ar" ? "إنشاء قناة" : "Create channel"}
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
