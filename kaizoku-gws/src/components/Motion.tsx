'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MotionButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export function MotionButton({ 
  variant = 'primary', 
  className, 
  children,
  ...props 
}: MotionButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-[#4FD1FF] to-[#4FD1FF] text-[#0B0D10] hover:from-[#6ED8FF] hover:to-[#6ED8FF]',
    secondary: 'bg-[#111418] border border-[#222] text-[#9AA4AF] hover:text-[#E6EDF3] hover:border-[#4FD1FF]',
    ghost: 'bg-transparent text-[#9AA4AF] hover:text-[#4FD1FF]',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'font-semibold py-3 px-6 rounded-lg transition-all duration-200',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

interface MotionLinkProps extends HTMLMotionProps<'a'> {
  children: React.ReactNode;
}

export function MotionLink({ className, children, ...props }: MotionLinkProps) {
  return (
    <motion.a
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={cn('inline-flex transition-all', className)}
      {...props}
    >
      {children}
    </motion.a>
  );
}

export function GlowCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-xl overflow-hidden border border-[#222] transition-all duration-300',
        'hover:border-[#4FD1FF] hover:shadow-[0_0_30px_rgba(79,209,255,0.15)]',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ 
  children, 
  delay = 0,
  direction = 'up'
}: { 
  children: React.ReactNode; 
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  );
}