"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { nftDrops } from "@/data/mock";
import { useLanguage } from "@/providers/language-provider";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Coins,
  Gem,
  Sparkle,
  Timer,
} from "lucide-react";
import { useState } from "react";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  }),
};

const filters = ["all", "auction", "fixed", "verified"] as const;

export default function NFTMarketplace() {
  const { t, language, messages } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("all");

  const filteredDrops = nftDrops.filter((drop) =>
    activeFilter === "all" ? true : drop.type === activeFilter,
  );

  return (
    <div className="space-y-14">
      <motion.section
        variants={fade}
        initial="hidden"
        animate="visible"
        className="rounded-[3rem] border border-border/30 bg-surface/95 p-10 shadow-card"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-text md:text-4xl">
              {messages.nft.title}
            </h1>
            <p className="max-w-2xl text-base text-text-muted md:text-lg">
              {messages.nft.subtitle}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary">
            <Gem className="h-4 w-4" />
            Polygon Proof-of-Ownership
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          {filters.map((filter) => (
            <Button
              key={filter}
              size="sm"
              variant={activeFilter === filter ? "primary" : "ghost"}
              onClick={() => setActiveFilter(filter)}
            >
              {t(`nft.filters.${filter}`)}
            </Button>
          ))}
        </div>
      </motion.section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredDrops.map((drop, index) => (
          <motion.div
            key={drop.id}
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
          >
            <Card className="h-full overflow-hidden">
              <div className="relative mb-6 flex h-48 items-center justify-center rounded-2xl border border-border/30 bg-gradient-to-br from-primary/25 via-background/70 to-accent/20">
                <div className="absolute inset-0 bg-grid-glow opacity-40" />
                <motion.div
                  initial={{ scale: 0.95, rotate: -6 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  className="relative flex h-32 w-32 items-center justify-center rounded-[2rem] border border-primary/30 bg-background/80 text-2xl font-black text-primary shadow-glow"
                >
                  T7
                </motion.div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text">
                    {drop.title[language]}
                  </h3>
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
                      drop.type === "auction"
                        ? "bg-secondary/20 text-secondary"
                        : "bg-primary/15 text-primary",
                    )}
                  >
                    <Timer className="h-3.5 w-3.5" />
                    {drop.type === "auction"
                      ? t("nft.filters.auction")
                      : t("nft.filters.fixed")}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-border/30 bg-background/80 px-4 py-3 text-sm">
                  <span className="flex items-center gap-2 text-text-muted">
                    <Coins className="h-4 w-4 text-accent" />
                    TFT
                  </span>
                  <span className="text-lg font-semibold text-text">
                    {drop.priceTft}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    {messages.nft.badges.polygon}
                  </span>
                  <span>
                    {language === "ar" ? "ينتهي خلال" : "Ends in"} {drop.endsIn}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span className="flex items-center gap-2">
                    <Sparkle className="h-4 w-4 text-secondary" />
                    {messages.nft.badges.edition} {drop.edition}
                  </span>
                  <Button size="sm">{language === "ar" ? "عرض التفاصيل" : "View details"}</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
