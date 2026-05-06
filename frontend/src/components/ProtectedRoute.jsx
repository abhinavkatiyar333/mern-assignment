import { Navigate } from 'react-router-dom';

const getToken = () => localStorage.getItem('taskManagerToken');

function ProtectedRoute({ children }) {
  if (!getToken()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
