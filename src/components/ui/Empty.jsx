import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = 'No tasks yet', 
  description = 'Start by creating your first task to get organized',
  actionLabel = 'Add Task',
  onAction,
  icon = 'CheckSquare'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-10 h-10 text-primary-600" />
      </div>
      
      <h3 className="text-xl font-display font-bold text-surface-900 mb-2">
        {title}
      </h3>
      
      <p className="text-surface-600 text-center mb-8 max-w-md">
        {description}
      </p>
      
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAction}
          className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <ApperIcon name="Plus" className="w-5 h-5" />
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;