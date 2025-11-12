'use client';

import { useLanguage } from '@/providers/language-provider';
import { motion } from 'framer-motion';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-surface/80 px-4 py-2 text-sm font-semibold text-text transition hover:border-primary/40 hover:text-primary"
    >
      <motion.span
        key={language}
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      >
        {language === 'ar' ? 'EN' : 'عربي'}
      </motion.span>
    </motion.button>
  );
}
