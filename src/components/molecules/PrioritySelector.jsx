import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';

const PrioritySelector = ({ value, onChange, className }) => {
  const priorities = [
    { value: 'high', label: 'High', color: 'text-red-600', icon: 'ArrowUp' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600', icon: 'Minus' },
    { value: 'low', label: 'Low', color: 'text-green-600', icon: 'ArrowDown' }
  ];

  return (
    <div className={cn('flex gap-2', className)}>
      {priorities.map((priority) => (
        <motion.button
          key={priority.value}
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(priority.value)}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all duration-200',
            value === priority.value
              ? 'bg-primary-100 border-primary-200 text-primary-800'
              : 'bg-white border-surface-200 text-surface-600 hover:border-surface-300'
          )}
        >
          <ApperIcon name={priority.icon} className={cn('w-4 h-4', priority.color)} />
          <span className="text-sm font-medium">{priority.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default PrioritySelector;