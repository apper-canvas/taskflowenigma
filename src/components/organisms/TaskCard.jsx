import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { cn } from '@/utils/cn';
import Checkbox from '@/components/atoms/Checkbox';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  onArchive 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500';
      case 'medium': return 'border-yellow-500';
      case 'low': return 'border-green-500';
      default: return 'border-surface-300';
    }
  };

  const getCategoryVariant = (category) => {
    switch (category.toLowerCase()) {
      case 'work': return 'work';
      case 'personal': return 'personal';
      case 'urgent': return 'urgent';
      case 'shopping': return 'shopping';
      case 'health': return 'health';
      default: return 'default';
    }
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isPast(date)) return `Overdue`;
    
    return format(date, 'MMM d');
  };

  const isDueDateOverdue = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return isPast(date) && !isToday(date);
  };

  const handleSaveEdit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onEdit(task.Id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.01, y: -2 }}
      className={cn(
        'bg-white rounded-lg shadow-sm border-l-4 border-r border-t border-b border-surface-200 p-6 transition-all duration-200',
        getPriorityColor(task.priority),
        task.completed && 'opacity-75'
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleComplete(task.Id)}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2 mb-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleSaveEdit}
                className="flex-1 px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                autoFocus
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-3">
              <h3
                className={cn(
                  'text-lg font-semibold text-surface-900 truncate cursor-pointer hover:text-primary-600',
                  task.completed && 'line-through text-surface-500'
                )}
                onClick={() => setIsEditing(true)}
              >
                {task.title}
              </h3>
            </div>
          )}
          
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant={getCategoryVariant(task.category)}>
              {task.category}
            </Badge>
            
            <Badge variant="default" size="sm">
              {task.priority}
            </Badge>
            
            {task.dueDate && (
              <div className={cn(
                'flex items-center gap-1 text-sm',
                isDueDateOverdue(task.dueDate) 
                  ? 'text-red-600 font-medium' 
                  : 'text-surface-600'
              )}>
                <ApperIcon name="Calendar" className="w-4 h-4" />
                {formatDueDate(task.dueDate)}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <ApperIcon name="Edit2" className="w-4 h-4" />
          </Button>
          
          {task.completed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onArchive(task.Id)}
            >
              <ApperIcon name="Archive" className="w-4 h-4" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.Id)}
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;