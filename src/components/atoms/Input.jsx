import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Input = forwardRef(({ 
  type = 'text',
  className,
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        'w-full px-4 py-3 rounded-lg border border-surface-200 bg-white',
        'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
        'placeholder:text-surface-400 text-surface-900',
        'transition-all duration-200',
        error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;