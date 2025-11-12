'use client';

import { cn } from '@/lib/utils';
import { forwardRef, type HTMLAttributes } from 'react';

export type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-border/40 bg-surface/90 p-6 shadow-card transition hover:-translate-y-1 hover:shadow-glow',
        className,
      )}
      {...props}
    />
  ),
);

Card.displayName = 'Card';
