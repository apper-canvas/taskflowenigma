import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';

const CategoryFilter = ({ 
  categories = [], 
  selectedCategory, 
  onCategoryChange,
  taskCounts = {} 
}) => {
  return (
    <div className="space-y-2">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onCategoryChange('all')}
        className={cn(
          'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
          selectedCategory === 'all' 
            ? 'bg-primary-100 text-primary-800 border-2 border-primary-200' 
            : 'text-surface-700 hover:bg-surface-100 border-2 border-transparent'
        )}
      >
        <ApperIcon name="Grid3X3" className="w-5 h-5" />
        <span className="flex-1 text-left font-medium">All Tasks</span>
        <span className="text-sm font-semibold">
          {Object.values(taskCounts).reduce((total, count) => total + count, 0)}
        </span>
      </motion.button>

      {categories.map((category) => (
        <motion.button
          key={category.Id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCategoryChange(category.name)}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
            selectedCategory === category.name 
              ? 'bg-primary-100 text-primary-800 border-2 border-primary-200' 
              : 'text-surface-700 hover:bg-surface-100 border-2 border-transparent'
          )}
        >
          <ApperIcon name={category.icon} className="w-5 h-5" style={{ color: category.color }} />
          <span className="flex-1 text-left font-medium">{category.name}</span>
          <span className="text-sm font-semibold">
            {taskCounts[category.name] || 0}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;