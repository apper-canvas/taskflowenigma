import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const FloatingAddButton = ({ onClick }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 md:hidden"
    >
      <Button
        onClick={onClick}
        className="w-14 h-14 rounded-full shadow-xl hover:shadow-2xl"
      >
        <ApperIcon name="Plus" className="w-6 h-6" />
      </Button>
    </motion.div>
  );
};

export default FloatingAddButton;