import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-12 px-6"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertTriangle" className="w-8 h-8 text-red-600" />
      </div>
      
      <h3 className="text-lg font-display font-semibold text-surface-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-surface-600 text-center mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRetry}
          className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <ApperIcon name="RotateCcw" className="w-4 h-4" />
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};

export default Error;