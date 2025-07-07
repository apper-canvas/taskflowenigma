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

const CompletedTasksModal = ({ isOpen, onClose, onTaskUpdate }) => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadCompletedTasks();
    }
  }, [isOpen]);

  const loadCompletedTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await taskService.getCompleted();
      setCompletedTasks(data);
    } catch (err) {
      setError('Failed to load completed tasks');
      console.error('Error loading completed tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUncomplete = async (taskId) => {
    try {
      await taskService.toggleComplete(taskId);
      setCompletedTasks(prev => prev.filter(task => task.Id !== taskId));
      onTaskUpdate?.();
      toast.success('Task marked as incomplete');
    } catch (err) {
      toast.error('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleArchive = async (taskId) => {
    try {
      await taskService.archive(taskId);
      setCompletedTasks(prev => prev.filter(task => task.Id !== taskId));
      onTaskUpdate?.();
      toast.success('Task archived successfully');
    } catch (err) {
      toast.error('Failed to archive task');
      console.error('Error archiving task:', err);
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
            Completed Tasks
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ApperIcon name="X" className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading && <Loading type="tasks" />}
          
          {error && <Error message={error} onRetry={loadCompletedTasks} />}
          
          {!loading && !error && completedTasks.length === 0 && (
            <Empty
              title="No completed tasks"
              description="Tasks you complete will appear here"
              icon="CheckCircle"
            />
          )}
          
          {!loading && !error && completedTasks.length > 0 && (
            <div className="space-y-4">
              <AnimatePresence>
                {completedTasks.map((task) => (
                  <motion.div
                    key={task.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-green-50 rounded-lg border border-green-200 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-surface-900 mb-2 line-through">
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
                          onClick={() => handleUncomplete(task.Id)}
                        >
                          <ApperIcon name="RotateCcw" className="w-4 h-4" />
                          Undo
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleArchive(task.Id)}
                        >
                          <ApperIcon name="Archive" className="w-4 h-4" />
                          Archive
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

export default CompletedTasksModal;