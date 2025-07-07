import { motion } from 'framer-motion';

const Loading = ({ type = 'tasks' }) => {
  const renderTaskSkeletons = () => (
    <>
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-surface-200 p-6 mb-4"
        >
          <div className="flex items-start gap-4">
            <div className="w-5 h-5 bg-gradient-to-r from-surface-200 to-surface-300 rounded animate-pulse"></div>
            <div className="flex-1">
              <div className="h-4 bg-gradient-to-r from-surface-200 to-surface-300 rounded animate-pulse mb-3"></div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-6 bg-gradient-to-r from-surface-200 to-surface-300 rounded-full animate-pulse"></div>
                <div className="w-12 h-6 bg-gradient-to-r from-surface-200 to-surface-300 rounded-full animate-pulse"></div>
                <div className="w-20 h-6 bg-gradient-to-r from-surface-200 to-surface-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );

  const renderCategorySkeletons = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-3 p-3 rounded-lg"
        >
          <div className="w-5 h-5 bg-gradient-to-r from-surface-200 to-surface-300 rounded animate-pulse"></div>
          <div className="flex-1 h-4 bg-gradient-to-r from-surface-200 to-surface-300 rounded animate-pulse"></div>
          <div className="w-6 h-6 bg-gradient-to-r from-surface-200 to-surface-300 rounded-full animate-pulse"></div>
        </motion.div>
      ))}
    </>
  );

  return (
    <div className="animate-fade-in">
      {type === 'tasks' ? renderTaskSkeletons() : renderCategorySkeletons()}
    </div>
  );
};

export default Loading;