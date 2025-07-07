import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from '@/components/organisms/TaskCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import taskService from '@/services/api/taskService';
import { toast } from 'react-toastify';

const TaskList = ({ 
  searchQuery = '', 
  selectedCategory = 'all',
  onTaskUpdate,
  onAddTask 
}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await taskService.getActive();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId);
      setTasks(prev => 
        prev.map(task => 
          task.Id === taskId 
            ? { ...task, completed: updatedTask.completed }
            : task
        )
      );
      
      onTaskUpdate?.();
      
      if (updatedTask.completed) {
        toast.success('Task completed! 🎉');
      } else {
        toast.info('Task marked as incomplete');
      }
    } catch (err) {
      toast.error('Failed to update task');
      console.error('Error toggling task:', err);
    }
  };

  const handleEditTask = async (taskId, updates) => {
    try {
      const updatedTask = await taskService.update(taskId, updates);
      setTasks(prev => 
        prev.map(task => 
          task.Id === taskId 
            ? { ...task, ...updates }
            : task
        )
      );
      
      onTaskUpdate?.();
      toast.success('Task updated successfully');
    } catch (err) {
      toast.error('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.delete(taskId);
        setTasks(prev => prev.filter(task => task.Id !== taskId));
        onTaskUpdate?.();
        toast.success('Task deleted successfully');
      } catch (err) {
        toast.error('Failed to delete task');
        console.error('Error deleting task:', err);
      }
    }
  };

  const handleArchiveTask = async (taskId) => {
    try {
      await taskService.archive(taskId);
      setTasks(prev => prev.filter(task => task.Id !== taskId));
      onTaskUpdate?.();
      toast.success('Task archived successfully');
    } catch (err) {
      toast.error('Failed to archive task');
      console.error('Error archiving task:', err);
    }
  };

  // Filter tasks based on search query and category
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <Loading type="tasks" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadTasks} />;
  }

  if (filteredTasks.length === 0) {
    if (searchQuery) {
      return (
        <Empty
          title="No tasks found"
          description={`No tasks match "${searchQuery}"`}
          icon="Search"
        />
      );
    }
    
    if (selectedCategory !== 'all') {
      return (
        <Empty
          title="No tasks in this category"
          description={`No tasks found in "${selectedCategory}" category`}
          actionLabel="Add Task"
          onAction={onAddTask}
          icon="FolderOpen"
        />
      );
    }
    
    return (
      <Empty
        title="No tasks yet"
        description="Start by creating your first task to get organized"
        actionLabel="Add Task"
        onAction={onAddTask}
        icon="CheckSquare"
      />
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.Id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onArchive={handleArchiveTask}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;