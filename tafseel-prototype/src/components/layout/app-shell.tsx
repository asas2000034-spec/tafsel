'use client';

import { Navbar } from '@/components/layout/navbar';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative flex min-h-screen flex-col pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-glow opacity-80" />
      <Navbar />
      <div className="mx-auto w-[min(1100px,92%)] flex-1 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
            className="space-y-12"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
