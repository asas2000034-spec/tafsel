"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/providers/language-provider";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Layers,
  ShieldCheck,
  Sparkles,
  Store,
  UploadCloud,
  Wallet,
} from "lucide-react";
import { type ReactNode, useEffect, useMemo, useState } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  }),
};

type NotificationItem = { id: string; message: string; icon: ReactNode };

export default function DesignerDashboard() {
  const { t, language, messages } = useLanguage();
  const { palette } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const notificationStream: NotificationItem[] = useMemo(
    () => [
      {
        id: "mint",
        message: t("designer.notifications.minted"),
        icon: <Sparkles className="h-4 w-4 text-primary" />,
      },
      {
        id: "storefront",
        message: t("designer.notifications.storefront"),
        icon: <Store className="h-4 w-4 text-accent" />,
      },
      {
        id: "factory",
        message: t("designer.notifications.factory"),
        icon: <ShieldCheck className="h-4 w-4 text-secondary" />,
      },
    ],
    [t],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % notificationStream.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [notificationStream.length]);

  const metrics = [
    { label: t("designer.metrics.ready"), value: "12", icon: <Sparkles className="h-5 w-5" /> },
    { label: t("designer.metrics.approved"), value: "8", icon: <ShieldCheck className="h-5 w-5" /> },
    { label: t("designer.metrics.bnpl"), value: "5", icon: <Wallet className="h-5 w-5" /> },
    { label: t("designer.metrics.royalty"), value: "18%", icon: <Layers className="h-5 w-5" /> },
  ];

  return (
    <div className="space-y-14">
      <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden rounded-[3rem] border border-border/30 bg-surface/95 p-10 shadow-card"
      >
        <div className="absolute inset-0 -z-10 bg-grid-glow opacity-70" />
        <div
          className="absolute -right-24 top-0 h-64 w-64 rounded-full blur-3xl"
          style={{ background: palette.accent }}
        />
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-primary">
              Designer · Control · Room
            </span>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-text md:text-4xl">
                {messages.designer.title}
              </h1>
              <p className="max-w-xl text-base text-text-muted md:text-lg">
                {messages.designer.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg">
                <UploadCloud className="h-5 w-5" />
                {messages.designer.actions.upload}
              </Button>
              <Button variant="ghost" size="lg">
                <Store className="h-5 w-5" />
                {messages.designer.actions.choose}
              </Button>
              <Button variant="accent" size="lg">
                <Sparkles className="h-5 w-5" />
                {messages.designer.actions.preview}
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={index * 0.1}
                  className="rounded-3xl border border-border/40 bg-background/80 px-4 py-5"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/30 bg-surface text-primary">
                    {metric.icon}
                  </div>
                  <p className="text-xs uppercase tracking-wide text-text-muted">
                    {metric.label}
                  </p>
                  <p className="text-2xl font-bold text-text">{metric.value}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6 rounded-[2.5rem] border border-border/30 bg-background/80 p-6 shadow-inner backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-text-muted">
                {messages.designer.notifications.title}
              </p>
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                Live
              </span>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-surface/80 p-4">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={notificationStream[activeIndex].id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
                  className="flex items-center gap-3 text-sm text-text"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15">
                    {notificationStream[activeIndex].icon}
                  </span>
                  {notificationStream[activeIndex].message}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="rounded-2xl border border-border/40 bg-gradient-to-br from-primary/12 via-surface to-accent/10 p-6">
              <div className="mb-4 flex items-center justify-between text-sm text-text-muted">
                <span>{language === "ar" ? "معاينة السك على Polygon" : "Polygon mint preview"}</span>
                <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                  Polygon ID
                </span>
              </div>
              <div className="space-y-3 rounded-xl border border-border/30 bg-background/90 p-4">
                <p className="text-xs uppercase tracking-wide text-text-muted">
                  NFT • 0x8F...C21
                </p>
                <p className="text-lg font-semibold text-text">
                  {language === "ar" ? "مجموعة أثير – سك اختبار" : "Ather Capsule – Test Mint"}
                </p>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>{language === "ar" ? "رسوم الغاز (Polygon)" : "Gas fee (Polygon)"}</span>
                  <span className="font-semibold text-text">0.004 MATIC</span>
                </div>
                <motion.div
                  initial={{ width: "20%" }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                  className="h-2 rounded-full bg-primary/20"
                >
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
                </motion.div>
                <Button size="sm" className="w-full">
                  <Sparkles className="h-4 w-4" />
                  {t("common.cta.mint")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text">
              {language === "ar" ? "لوحة رحلة التصميم" : "Design journey board"}
            </h2>
            <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold text-secondary">
              Web3 Sync
            </span>
          </div>
          <p className="mt-3 text-sm text-text-muted">
            {language === "ar"
              ? "تابع الانتقال من تصميم أولي إلى طلب مصنع متكامل وسك NFT في لوحة واحدة."
              : "Track the flow from concept to factory-ready order and NFT mint in one board."}
          </p>
          <div className="mt-6 space-y-4 text-sm">
            {[
              { label: language === "ar" ? "نماذج أولية" : "Prototypes", progress: 70 },
              { label: language === "ar" ? "طلبات المصنع" : "Factory Orders", progress: 55 },
              { label: language === "ar" ? "سك الرموز" : "NFT Minting", progress: 42 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>{item.label}</span>
                  <span>{item.progress}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-border/50">
                  <div
                    className={cn(
                      "h-full rounded-full bg-gradient-to-r from-primary to-accent",
                    )}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text">
              {language === "ar" ? "تكامل المصنع" : "Factory integration"}
            </h2>
            <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
              {t("common.status.syncing")}
            </span>
          </div>
          <div className="mt-5 space-y-4 text-sm text-text-muted">
            <div className="flex items-center gap-3 rounded-2xl border border-border/30 bg-surface/80 p-4">
              <Cpu className="h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold text-text">
                  {language === "ar" ? "بروتوكول QC مؤتمت" : "Automated QC Protocol"}
                </p>
                <p className="text-xs">
                  {language === "ar"
                    ? "يتم إرسال نقاط الجودة إلى المصنع عبر العقود الذكية."
                    : "Quality checkpoints push to the factory via smart contracts."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border/30 bg-surface/80 p-4">
              <Layers className="h-5 w-5 text-secondary" />
              <div>
                <p className="font-semibold text-text">
                  {language === "ar" ? "مخطط المواد" : "Material blueprint"}
                </p>
                <p className="text-xs">
                  {language === "ar"
                    ? "يتم توليد CSV للخامات وتتبعها على Polygon."
                    : "Material CSV auto-generated and traced on Polygon."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border/30 bg-surface/80 p-4">
              <Wallet className="h-5 w-5 text-accent" />
              <div>
                <p className="font-semibold text-text">
                  {language === "ar" ? "مدفوعات TFT سريعة" : "Instant TFT payouts"}
                </p>
                <p className="text-xs">
                  {language === "ar"
                    ? "يتم توزيع الأرباح مباشرة على المصمم والمصنع."
                    : "Revenue splits clear instantly to designer and factory."}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
