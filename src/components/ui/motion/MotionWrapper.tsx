'use client';

import * as React from 'react';

export type AnimationType = 'fade' | 'slide' | 'slideDown' | 'slideIn' | 'scale' | 'fadeIn' | 'scaleIn' | 'slideUp';

export interface MotionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  stagger?: boolean;
  staggerDelay?: number;
  layout?: boolean;
  children: React.ReactNode;
}

export const MotionWrapper = ({ children, className, ...props }: MotionWrapperProps) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export default MotionWrapper;
