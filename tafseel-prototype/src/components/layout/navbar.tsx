'use client';

import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/language/language-toggle';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { useLanguage } from '@/providers/language-provider';
import { useTheme } from '@/providers/theme-provider';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', key: 'navigation.home' },
  { href: '/designer', key: 'navigation.designer' },
  { href: '/manufacturer', key: 'navigation.manufacturer' },
  { href: '/nft', key: 'navigation.nft' },
  { href: '/wallet', key: 'navigation.wallet' },
  { href: '/design-system', key: 'navigation.designSystem' },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const { t, dir } = useLanguage();
  const { palette } = useTheme();

  return (
    <header className="sticky top-4 z-50 mx-auto w-[min(1100px,92%)]">
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className="glass flex items-center justify-between gap-4 rounded-full px-6 py-4 shadow-card"
      >
        <Link href="/" className="flex items-center gap-3">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/80 via-primary/90 to-accent/70 text-xl font-black text-primary-foreground shadow-glow"
            style={{ backgroundImage: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})` }}
          >
            T
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-muted">
              Tafseel
            </p>
            <p className="text-lg font-bold text-text">تفصيل</p>
          </div>
        </Link>

        <div
          className={cn(
            'hidden items-center gap-1 rounded-full border border-border/30 bg-background/80 px-2 py-1 text-sm font-medium text-text shadow-inner lg:flex',
            dir === 'rtl' ? 'flex-row-reverse' : 'flex-row',
          )}
        >
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative inline-flex h-9 items-center rounded-full px-4"
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute inset-0 rounded-full bg-primary/15 shadow-glow"
                    transition={{ type: 'spring', stiffness: 450, damping: 40 }}
                  />
                )}
                <span className="relative z-10">{t(link.key)}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/design-system">{t('common.cta.design')}</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/wallet">{t('common.cta.launch')}</Link>
          </Button>
        </div>
      </motion.nav>
    </header>
  );
}
