import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import FormField from '@/components/molecules/FormField';
import PrioritySelector from '@/components/molecules/PrioritySelector';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const TaskForm = ({ 
  onSubmit, 
  onCancel, 
  categories = [], 
  initialData = null,
  isVisible = false 
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || 'Work',
    priority: initialData?.priority || 'medium',
    dueDate: initialData?.dueDate || ''
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
      setFormData({
        title: '',
        category: 'Work',
        priority: 'medium',
        dueDate: ''
      });
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-surface-900">
            {initialData ? 'Edit Task' : 'Add New Task'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <ApperIcon name="X" className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="Task Title" required error={errors.title}>
            <Input
              type="text"
              placeholder="Enter task title..."
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              error={errors.title}
            />
          </FormField>

          <FormField label="Category" required error={errors.category}>
            <Select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              error={errors.category}
            >
              {categories.map(category => (
                <option key={category.Id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Priority">
            <PrioritySelector
              value={formData.priority}
              onChange={(priority) => handleChange('priority', priority)}
            />
          </FormField>

          <FormField label="Due Date">
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
            />
          </FormField>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              <ApperIcon name="Check" className="w-4 h-4" />
              {initialData ? 'Update Task' : 'Add Task'}
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default TaskForm;