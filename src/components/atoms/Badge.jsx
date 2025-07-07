import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Badge = forwardRef(({ 
  children, 
  variant = 'default', 
  size = 'md',
  className,
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-surface-100 text-surface-700 border-surface-200',
    primary: 'bg-primary-100 text-primary-800 border-primary-200',
    secondary: 'bg-secondary-100 text-secondary-800 border-secondary-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    work: 'bg-purple-100 text-purple-800 border-purple-200',
    personal: 'bg-green-100 text-green-800 border-green-200',
    urgent: 'bg-red-100 text-red-800 border-red-200',
    shopping: 'bg-amber-100 text-amber-800 border-amber-200',
    health: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full font-medium border',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;