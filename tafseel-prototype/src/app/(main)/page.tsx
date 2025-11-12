"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { designers, manufacturers } from "@/data/mock";
import { useLanguage } from "@/providers/language-provider";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

export default function HomePage() {
  const { t, language, messages } = useLanguage();
  const hero = messages.home.hero;
  const sections = messages.home.sections;
  const steps = messages.home.howItWorks;

  return (
    <div className="space-y-16">
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden rounded-[3rem] border border-border/30 bg-surface/95 p-10 shadow-card"
      >
        <div className="absolute inset-0 -z-10 bg-grid-glow opacity-80" />
        <div className="absolute inset-x-10 top-10 -z-10 h-40 rounded-full bg-gradient-to-r from-primary/30 via-accent/30 to-primary/20 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-primary">
                Web3 • Polygon • BNPL
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent">
                TFT 1:1 SAR
              </span>
            </div>
            <div className="space-y-3">
              <motion.h1
                className="text-4xl font-black leading-tight text-text md:text-5xl xl:text-6xl"
                variants={fadeUp}
              >
                <span className="block text-gradient">{hero.arabicTitle}</span>
                <span className="block text-text/90">{hero.englishTitle}</span>
              </motion.h1>
              <p className="max-w-xl text-base text-text-muted md:text-lg">
                {hero.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href="/designer">
                  {hero.primaryCta}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/nft">
                  <PlayCircle className="h-5 w-5" />
                  {hero.secondaryCta}
                </Link>
              </Button>
            </div>
            <dl className="grid shrink-0 grid-cols-2 gap-4 text-sm text-text-muted sm:grid-cols-4">
              <div>
                <dt className="font-semibold text-text">+120</dt>
                <dd>{language === "ar" ? "مصمم نشط" : "Active designers"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-text">28</dt>
                <dd>{language === "ar" ? "مصنع متكامل" : "Integrated factories"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-text">8.2K</dt>
                <dd>{language === "ar" ? "رمز مملوك" : "NFTs owned"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-text">3</dt>
                <dd>{language === "ar" ? "شركاء BNPL" : "BNPL partners"}</dd>
              </div>
            </dl>
          </div>
          <div className="relative grid place-items-center rounded-[2.5rem] border border-primary/30 bg-gradient-to-br from-primary/20 via-background/60 to-accent/10 p-8 shadow-inner">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="relative flex w-full flex-col gap-6 rounded-[2rem] border border-border/30 bg-background/80 p-6 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-text-muted">TFT</p>
                  <p className="text-3xl font-black text-text">18,450</p>
                </div>
                <span className="rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold text-primary">
                  Polygon
                </span>
              </div>
              <div className="flex items-end justify-between rounded-2xl bg-surface/80 p-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-text-muted">
                    {language === "ar" ? "الحالة" : "Status"}
                  </p>
                  <p className="text-lg font-bold text-text">
                    {language === "ar" ? "التسوية فورية" : "Instant Settlement"}
                  </p>
                </div>
                <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
                  BNPL
                </span>
              </div>
              <div className="space-y-3 text-sm text-text-muted">
                <p className="flex items-center justify-between rounded-2xl border border-border/30 bg-surface/60 px-4 py-3">
                  <span>{language === "ar" ? "Tap (مدفوعات)" : "Tap Payments"}</span>
                  <span className="font-semibold text-text">✔</span>
                </p>
                <p className="flex items-center justify-between rounded-2xl border border-border/30 bg-surface/60 px-4 py-3">
                  <span>{language === "ar" ? "تمارا (BNPL)" : "Tamara BNPL"}</span>
                  <span className="font-semibold text-text">●</span>
                </p>
                <p className="flex items-center justify-between rounded-2xl border border-border/30 bg-surface/60 px-4 py-3">
                  <span>{language === "ar" ? "تابي (BNPL)" : "Taby BNPL"}</span>
                  <span className="font-semibold text-text">●</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-text md:text-3xl">
            {sections.trendingDesigners}
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/designer">{t("common.cta.viewAll")}</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {designers.map((designer, index) => (
            <motion.div
              key={designer.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
            >
              <Card className="h-full">
                <div className="relative mb-6 flex items-center justify-between">
                  <span
                    className="h-16 w-16 rounded-2xl border border-border/30"
                    style={{ background: designer.avatarGradient }}
                  />
                  <span className="rounded-full bg-primary/12 px-3 py-1 text-xs font-medium text-primary">
                    {designer.badge}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-text">
                  {designer.name[language]}
                </h3>
                <p className="mt-2 text-sm text-text-muted">
                  {designer.specialty[language]}
                </p>
                <div className="mt-6 flex items-center justify-between rounded-2xl bg-background/70 px-4 py-3 text-sm">
                  <span className="text-text-muted">
                    {language === "ar" ? "إجمالي المبيعات" : "Total Volume"}
                  </span>
                  <span className="font-semibold text-text">
                    {designer.volume}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-text md:text-3xl">
            {sections.featuredManufacturers}
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/manufacturer">{t("common.cta.viewAll")}</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {manufacturers.map((factory, index) => (
            <motion.div
              key={factory.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
            >
              <Card className="h-full">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text">
                    {factory.name[language]}
                  </h3>
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor:
                        factory.status === "active"
                          ? "rgba(var(--color-primary), 1)"
                          : factory.status === "syncing"
                            ? "rgba(var(--color-accent), 1)"
                            : "rgba(255, 196, 44, 1)",
                    }}
                  />
                </div>
                <p className="text-sm text-text-muted">
                  {factory.capability[language]}
                </p>
                <div className="mt-6 flex items-center justify-between rounded-2xl bg-background/70 px-4 py-3 text-sm">
                  <span className="text-text-muted">
                    {language === "ar" ? "زمن التنفيذ" : "Turnaround"}
                  </span>
                  <span className="font-semibold text-text">
                    {factory.turnaround}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-10 rounded-[3rem] border border-border/30 bg-surface/90 p-10 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-text md:text-3xl">
              {sections.howItWorks}
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              {language === "ar"
                ? "رحلة متكاملة من التصميم إلى التصنيع والتوزيع والتسوية المالية."
                : "An end-to-end flow from design to production, distribution, and settlement."}
            </p>
          </div>
          <Button asChild size="sm">
            <Link href="/wallet">
              {language === "ar" ? "ابدأ الآن" : "Start now"}
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
              className="rounded-3xl border border-border/40 bg-background/60 p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-border/30 bg-surface text-lg font-bold text-primary">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="overflow-hidden rounded-[3rem] border border-primary/20 bg-gradient-to-br from-primary/25 via-background/70 to-accent/20 p-10 text-center shadow-card"
      >
        <div className="mx-auto max-w-2xl space-y-6">
          <h2 className="text-3xl font-bold text-text md:text-4xl">
            {messages.home.community.title}
          </h2>
          <p className="text-base text-text-muted md:text-lg">
            {messages.home.community.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/nft">
                {t("common.cta.join")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/design-system">{t("common.cta.design")}</Link>
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
