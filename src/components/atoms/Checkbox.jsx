import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Checkbox = forwardRef(({ 
  checked = false,
  className,
  onChange,
  ...props 
}, ref) => {
  return (
    <motion.button
      ref={ref}
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onChange}
      className={cn(
        'w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200',
        checked 
          ? 'bg-primary-600 border-primary-600 text-white' 
          : 'bg-white border-surface-300 hover:border-primary-400',
        className
      )}
      {...props}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <ApperIcon name="Check" className="w-3 h-3" />
        </motion.div>
      )}
    </motion.button>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;