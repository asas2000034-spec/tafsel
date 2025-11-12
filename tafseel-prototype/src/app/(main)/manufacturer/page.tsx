"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { manufacturers } from "@/data/mock";
import { useLanguage } from "@/providers/language-provider";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Factory,
  RefreshCw,
  Shield,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  }),
};

type RequestItem = {
  id: string;
  label: string;
  detail: string;
};

export default function ManufacturerDashboard() {
  const { t, language, messages } = useLanguage();
  const [index, setIndex] = useState(0);

  const requests: RequestItem[] = useMemo(
    () => [
      {
        id: "req-1",
        label: t("manufacturer.requests.newRequest"),
        detail:
          language === "ar"
            ? "ليان العتيبي أرسلت عقداً لدفعة عباءات رقمية."
            : "Layan Al-Otaibi dispatched a contract for digital abaya batch.",
      },
      {
        id: "req-2",
        label: t("manufacturer.requests.capacity"),
        detail:
          language === "ar"
            ? "تحديث طاقة ورشة الخياطة الذكية إلى 92%."
            : "Smart Atelier capacity synced to 92%.",
      },
      {
        id: "req-3",
        label: language === "ar" ? "طلب مراجعة جودة" : "Quality review requested",
        detail:
          language === "ar"
            ? "تم طلب مراجعة جودة لمخطط نسيج أثير على Polygon."
            : "Quality review requested for Ather textile blueprint on Polygon.",
      },
    ],
    [language, t],
  );

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % requests.length),
      3600,
    );
    return () => clearInterval(interval);
  }, [requests.length]);

  return (
    <div className="space-y-14">
      <motion.section
        variants={fade}
        initial="hidden"
        animate="visible"
        className="rounded-[3rem] border border-border/30 bg-surface/95 p-10 shadow-card"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-secondary">
              Factory · Ops
            </span>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-text md:text-4xl">
                {messages.manufacturer.title}
              </h1>
              <p className="max-w-2xl text-base text-text-muted md:text-lg">
                {messages.manufacturer.subtitle}
              </p>
            </div>
          </div>
          <Button variant="accent" size="lg">
            <Workflow className="h-5 w-5" />
            {messages.manufacturer.contracts.cta}
          </Button>
        </div>
      </motion.section>

      <div className="grid gap-8 xl:grid-cols-[1.6fr_1fr]">
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text">
              {messages.manufacturer.contracts.title}
            </h2>
            <Button variant="ghost" size="sm">
              {t("common.cta.viewAll")}
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {manufacturers.map((factory, index) => (
              <motion.div
                key={factory.id}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={index * 0.1}
              >
                <Card className="h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-text-muted">
                        {language === "ar" ? "مصنع" : "Factory"}
                      </p>
                      <h3 className="text-lg font-semibold text-text">
                        {factory.name[language]}
                      </h3>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {factory.turnaround}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-text-muted">
                    {factory.capability[language]}
                  </p>
                  <div className="mt-5 space-y-3 text-sm">
                    <div className="flex items-center gap-3 rounded-2xl border border-border/40 bg-background/80 px-4 py-3">
                      <Factory className="h-4 w-4 text-secondary" />
                      <span>
                        {language === "ar"
                          ? "مرحلة الإنتاج: قطع رقمية"
                          : "Production stage: Digital cutting"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-border/40 bg-background/80 px-4 py-3">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>
                        {language === "ar"
                          ? "سك NFT متزامن"
                          : "NFT mint in sync"}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text">
              {messages.manufacturer.requests.title}
            </h2>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              <RefreshCw className="h-3.5 w-3.5" />
              {t("common.status.syncing")}
            </span>
          </div>
          <Card className="space-y-4">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={requests[index].id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
                className="rounded-2xl border border-border/40 bg-background/80 p-4"
              >
                <p className="text-sm font-semibold text-text">
                  {requests[index].label}
                </p>
                <p className="mt-2 text-xs text-text-muted">
                  {requests[index].detail}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="space-y-3 text-sm text-text-muted">
              <div className="flex items-center gap-2 rounded-2xl border border-border/30 bg-surface/80 p-3">
                <Shield className="h-4 w-4 text-primary" />
                <span>
                  {language === "ar"
                    ? "العقود مؤمنة بتوقيع متعدد على Polygon."
                    : "Contracts secured with multi-sig on Polygon."}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-border/30 bg-surface/80 p-3">
                <Clock className="h-4 w-4 text-secondary" />
                <span>
                  {language === "ar"
                    ? "تنبيهات زمن التنفيذ تظهر فوراً للمصنع والمصمم."
                    : "Turnaround alerts surface instantly to factory and designer."}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-border/30 bg-surface/80 p-3">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>
                  {language === "ar"
                    ? "دعم BNPL جاهز للتسويات الجزئية."
                    : "BNPL support ready for split settlements."}
                </span>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
