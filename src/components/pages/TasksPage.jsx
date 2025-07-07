import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/organisms/Header';
import CategorySidebar from '@/components/organisms/CategorySidebar';
import TaskList from '@/components/organisms/TaskList';
import TaskForm from '@/components/organisms/TaskForm';
import ArchivedTasksModal from '@/components/organisms/ArchivedTasksModal';
import CompletedTasksModal from '@/components/organisms/CompletedTasksModal';
import FloatingAddButton from '@/components/organisms/FloatingAddButton';
import categoryService from '@/services/api/categoryService';
import taskService from '@/services/api/taskService';
import { toast } from 'react-toastify';

const TasksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showArchivedModal, setShowArchivedModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const handleAddTask = () => {
    setShowTaskForm(true);
  };

  const handleTaskFormSubmit = async (taskData) => {
    try {
      await taskService.create(taskData);
      setShowTaskForm(false);
      
      // Refresh category counts
      if (window.refreshCategoryCounts) {
        window.refreshCategoryCounts();
      }
      
      toast.success('Task added successfully! 🎉');
    } catch (err) {
      toast.error('Failed to add task');
      console.error('Error adding task:', err);
    }
  };

  const handleTaskUpdate = () => {
    // Refresh category counts when tasks are updated
    if (window.refreshCategoryCounts) {
      window.refreshCategoryCounts();
    }
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <Header 
        onSearch={setSearchQuery}
        onAddTask={handleAddTask}
        searchQuery={searchQuery}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CategorySidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onViewArchived={() => setShowArchivedModal(true)}
              onViewCompleted={() => setShowCompletedModal(true)}
            />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"
            >
              <div className="mb-6">
                <h2 className="text-xl font-display font-bold text-surface-900">
                  {selectedCategory === 'all' ? 'All Tasks' : `${selectedCategory} Tasks`}
                </h2>
                <p className="text-surface-600 mt-1">
                  {searchQuery ? `Search results for "${searchQuery}"` : 'Manage your tasks efficiently'}
                </p>
              </div>
              
              <TaskList
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                onTaskUpdate={handleTaskUpdate}
                onAddTask={handleAddTask}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TaskForm
        isVisible={showTaskForm}
        categories={categories}
        onSubmit={handleTaskFormSubmit}
        onCancel={() => setShowTaskForm(false)}
      />

      <ArchivedTasksModal
        isOpen={showArchivedModal}
        onClose={() => setShowArchivedModal(false)}
        onTaskUpdate={handleTaskUpdate}
      />

      <CompletedTasksModal
        isOpen={showCompletedModal}
        onClose={() => setShowCompletedModal(false)}
        onTaskUpdate={handleTaskUpdate}
      />

      {/* Floating Add Button */}
      <FloatingAddButton onClick={handleAddTask} />
    </div>
  );
};

export default TasksPage;