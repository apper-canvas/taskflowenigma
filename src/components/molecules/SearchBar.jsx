import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ onSearch, placeholder = 'Search tasks...' }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" className="w-5 h-5 text-surface-400" />
      </div>
      
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className="pl-10 pr-10"
      />
      
      {query && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-surface-400 hover:text-surface-600"
        >
          <ApperIcon name="X" className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
};

export default SearchBar;