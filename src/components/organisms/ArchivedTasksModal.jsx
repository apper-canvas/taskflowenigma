import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import taskService from '@/services/api/taskService';
import { toast } from 'react-toastify';

const ArchivedTasksModal = ({ isOpen, onClose, onTaskUpdate }) => {
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadArchivedTasks();
    }
  }, [isOpen]);

  const loadArchivedTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await taskService.getArchived();
      setArchivedTasks(data);
    } catch (err) {
      setError('Failed to load archived tasks');
      console.error('Error loading archived tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (taskId) => {
    try {
      await taskService.restore(taskId);
      setArchivedTasks(prev => prev.filter(task => task.Id !== taskId));
      onTaskUpdate?.();
      toast.success('Task restored successfully');
    } catch (err) {
      toast.error('Failed to restore task');
      console.error('Error restoring task:', err);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to permanently delete this task?')) {
      try {
        await taskService.delete(taskId);
        setArchivedTasks(prev => prev.filter(task => task.Id !== taskId));
        toast.success('Task deleted permanently');
      } catch (err) {
        toast.error('Failed to delete task');
        console.error('Error deleting task:', err);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-surface-200">
          <h2 className="text-xl font-display font-bold text-surface-900">
            Archived Tasks
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ApperIcon name="X" className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading && <Loading type="tasks" />}
          
          {error && <Error message={error} onRetry={loadArchivedTasks} />}
          
          {!loading && !error && archivedTasks.length === 0 && (
            <Empty
              title="No archived tasks"
              description="Completed tasks you archive will appear here"
              icon="Archive"
            />
          )}
          
          {!loading && !error && archivedTasks.length > 0 && (
            <div className="space-y-4">
              <AnimatePresence>
                {archivedTasks.map((task) => (
                  <motion.div
                    key={task.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-surface-50 rounded-lg border border-surface-200 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-surface-900 mb-2">
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="default" size="sm">
                            {task.category}
                          </Badge>
                          <Badge variant="default" size="sm">
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-surface-600">
                          Completed: {format(new Date(task.createdAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleRestore(task.Id)}
                        >
                          <ApperIcon name="RotateCcw" className="w-4 h-4" />
                          Restore
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(task.Id)}
                        >
                          <ApperIcon name="Trash2" className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ArchivedTasksModal;