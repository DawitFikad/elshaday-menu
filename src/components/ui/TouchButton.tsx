import React from 'react';
import { cn } from '@/lib/utils';

interface TouchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const TouchButton: React.FC<TouchButtonProps> = ({ 
  children, 
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props 
}) => {
  const baseClasses = 'mobile-touch-target transition-all font-semibold rounded-xl';
  
  const variants = {
    primary: 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20 active:scale-95',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
    outline: 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
