import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CategoryFilter from '@/components/molecules/CategoryFilter';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import categoryService from '@/services/api/categoryService';
import taskService from '@/services/api/taskService';

const CategorySidebar = ({ 
  selectedCategory, 
  onCategoryChange, 
  onViewArchived,
  onViewCompleted 
}) => {
  const [categories, setCategories] = useState([]);
  const [taskCounts, setTaskCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCategoriesAndCounts();
  }, []);

  const loadCategoriesAndCounts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [categoriesData, tasksData] = await Promise.all([
        categoryService.getAll(),
        taskService.getActive()
      ]);
      
      setCategories(categoriesData);
      
      // Calculate task counts by category
      const counts = {};
      tasksData.forEach(task => {
        counts[task.category] = (counts[task.category] || 0) + 1;
      });
      setTaskCounts(counts);
      
    } catch (err) {
      setError('Failed to load categories');
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshCounts = async () => {
    try {
      const tasksData = await taskService.getActive();
      const counts = {};
      tasksData.forEach(task => {
        counts[task.category] = (counts[task.category] || 0) + 1;
      });
      setTaskCounts(counts);
    } catch (err) {
      console.error('Error refreshing counts:', err);
    }
  };

  // Expose refresh function for parent component
  useEffect(() => {
    window.refreshCategoryCounts = refreshCounts;
    return () => {
      delete window.refreshCategoryCounts;
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
        <Loading type="categories" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
        <Error message={error} onRetry={loadCategoriesAndCounts} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-display font-bold text-surface-900 mb-4">
          Categories
        </h2>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          taskCounts={taskCounts}
        />
      </div>

      <div className="border-t border-surface-200 pt-6 space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onViewCompleted}
          className="w-full flex items-center gap-3 px-4 py-3 text-surface-700 hover:bg-surface-100 rounded-lg transition-all duration-200"
        >
          <ApperIcon name="CheckCircle" className="w-5 h-5 text-green-600" />
          <span className="flex-1 text-left font-medium">Completed</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onViewArchived}
          className="w-full flex items-center gap-3 px-4 py-3 text-surface-700 hover:bg-surface-100 rounded-lg transition-all duration-200"
        >
          <ApperIcon name="Archive" className="w-5 h-5 text-surface-600" />
          <span className="flex-1 text-left font-medium">Archived</span>
        </motion.button>
      </div>
    </div>
  );
};

export default CategorySidebar;