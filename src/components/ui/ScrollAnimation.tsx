'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAnimationProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  stagger?: boolean;
  staggerDelay?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

// No-op component - renders children without animations
export function ScrollAnimation({
  children,
  className,
}: ScrollAnimationProps) {
  return <div className={className}>{children}</div>;
}

// Container - no animations
export function ScrollAnimationContainer({
  children,
  className,
  staggerDelay,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return <div className={cn('space-y-4', className)}>{children}</div>;
}

