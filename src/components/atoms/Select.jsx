import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Select = forwardRef(({ 
  className,
  children,
  error,
  ...props 
}, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        'w-full px-4 py-3 rounded-lg border border-surface-200 bg-white',
        'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
        'text-surface-900 appearance-none cursor-pointer',
        'transition-all duration-200',
        error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';

export default Select;