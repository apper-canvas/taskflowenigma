import { motion } from 'framer-motion';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Header = ({ onSearch, onAddTask, searchQuery = '' }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b border-surface-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p className="text-sm text-surface-600">Efficient task management</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block w-96">
              <SearchBar
                onSearch={onSearch}
                placeholder="Search tasks..."
              />
            </div>
            
            <Button onClick={onAddTask} className="hidden sm:flex">
              <ApperIcon name="Plus" className="w-5 h-5" />
              Add Task
            </Button>
            
            <Button onClick={onAddTask} size="sm" className="sm:hidden">
              <ApperIcon name="Plus" className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="md:hidden pb-4">
          <SearchBar
            onSearch={onSearch}
            placeholder="Search tasks..."
          />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;