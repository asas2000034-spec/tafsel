"use client";

import { LanguageToggle } from "@/components/language/language-toggle";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LogoPaletteUploader } from "@/components/theme/logo-palette-uploader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/providers/language-provider";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function DesignSystemPage() {
  const { messages, language } = useLanguage();
  const { palette } = useTheme();

  return (
    <div className="space-y-14">
      <section className="rounded-[3rem] border border-border/30 bg-surface/95 p-10 shadow-card">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-text md:text-4xl">
              {messages.designSystem.title}
            </h1>
            <p className="max-w-2xl text-base text-text-muted md:text-lg">
              {messages.designSystem.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </section>

      <section className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
        <LogoPaletteUploader />

        <Card className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-text">
              {messages.designSystem.palette.title}
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              {messages.designSystem.palette.description}
            </p>
          </div>
          <div className="grid gap-3">
            {Object.entries(palette).map(([token, value]) => (
              <div
                key={token}
                className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/80 px-4 py-3"
              >
                <div>
                  <p className="text-xs uppercase tracking-wide text-text-muted">
                    {token}
                  </p>
                  <p className="text-sm font-semibold text-text">{value}</p>
                </div>
                <span
                  className="h-10 w-10 rounded-xl border border-border/40"
                  style={{ background: value }}
                />
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-text">
          {messages.designSystem.typography.english} / {messages.designSystem.typography.arabic}
        </h2>
        <div className="grid gap-6 rounded-[3rem] border border-border/30 bg-background/80 p-8 md:grid-cols-2">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-text-muted">Display</p>
            <p className="text-4xl font-black text-text">تفصيل – Tafseel</p>
            <p className="text-lg text-text-muted">
              Infrastructure for fashion linking designers, manufacturers, buyers, and NFTs.
            </p>
          </div>
          <div className="space-y-3 text-lg text-text-muted">
            <p>{language === "ar" ? "السطر الأساس للغة العربية باستخدام خط Tajawal." : "Arabic headline using Tajawal for RTL support."}</p>
            <p>{language === "ar" ? "الخط الإنجليزي Montserrat مع وزن ديناميكي." : "English copy set in Montserrat with variable weight."}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <Card className="space-y-4">
          <h3 className="text-lg font-semibold text-text">
            {messages.designSystem.components.buttons}
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Primary</Button>
            <Button variant="accent" size="sm">
              Accent
            </Button>
            <Button variant="ghost" size="sm">
              Ghost
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" className="rounded-3xl">
              Large CTA
            </Button>
            <Button variant="accent" size="lg" className="rounded-3xl">
              Accent CTA
            </Button>
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="text-lg font-semibold text-text">
            {messages.designSystem.components.cards}
          </h3>
          <div className="grid gap-4 text-sm text-text-muted">
            {[1, 2].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-2xl border border-border/30 bg-surface/80 px-4 py-3"
              >
                {language === "ar"
                  ? `مكوّن بطاقة ${index} مع تأثير زجاجي وظل متوهج.`
                  : `Card component ${index} with glass blur and glow shadow.`}
              </motion.div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <Card className="space-y-4">
          <h3 className="text-lg font-semibold text-text">
            {messages.designSystem.components.toggles}
          </h3>
          <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-border/30 bg-background/80 p-6">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </Card>
        <Card className="space-y-4">
          <h3 className="text-lg font-semibold text-text">
            {language === "ar" ? "حالات الوضعين" : "Theme states"}
          </h3>
          <div className="grid gap-3 text-sm text-text-muted">
            <div className="flex items-center justify-between rounded-2xl border border-border/30 bg-surface/80 px-4 py-3">
              <span>Light</span>
              <span className={cn("h-7 w-12 rounded-full", "bg-gradient-to-r from-primary/50 to-accent/50")} />
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border/30 bg-surface/80 px-4 py-3">
              <span>Dark</span>
              <span className="h-7 w-12 rounded-full bg-gradient-to-r from-neutral/60 to-primary/40" />
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
