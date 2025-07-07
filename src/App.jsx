import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import TasksPage from '@/components/pages/TasksPage';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-surface-50">
        <Routes>
          <Route path="/" element={<TasksPage />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="!bg-white !text-surface-900 !rounded-lg !shadow-lg !border !border-surface-200"
          bodyClassName="!text-surface-800 !font-medium"
          progressClassName="!bg-gradient-to-r !from-primary-500 !to-primary-600"
        />
      </div>
    </Router>
  );
}

export default App;