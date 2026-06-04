import React from 'react';
import { cn } from '@/lib/utils';

interface MobileGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
}

export const MobileGrid: React.FC<MobileGridProps> = ({ 
  children, 
  className,
  cols = { default: 1, sm: 2, lg: 3 },
  gap = 'gap-4 sm:gap-6 lg:gap-8'
}) => {
  const gridClasses = cn(
    'grid',
    `grid-cols-${cols.default}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    gap,
    className
  );

  return <div className={gridClasses}>{children}</div>;
};
