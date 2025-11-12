'use client';

import { useTheme } from '@/providers/theme-provider';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { mode, toggleMode } = useTheme();

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.94 }}
      onClick={toggleMode}
      className="relative inline-flex h-10 w-20 items-center rounded-full border border-border/50 bg-surface/80 px-2 shadow-inner transition hover:border-primary/40"
      aria-label="تبديل الوضع اللوني"
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute inset-y-1 w-1/2 rounded-full bg-gradient-to-r from-primary/90 to-accent/70 shadow-glow"
        style={{
          left: mode === 'light' ? '4px' : 'calc(50% - 4px)',
        }}
      />
      <span className="relative flex w-1/2 items-center justify-center gap-1 text-xs font-semibold text-text-muted">
        <Sun className="h-4 w-4" />
      </span>
      <span className="relative flex w-1/2 items-center justify-center gap-1 text-xs font-semibold text-text-muted">
        <Moon className="h-4 w-4" />
      </span>
    </motion.button>
  );
}
