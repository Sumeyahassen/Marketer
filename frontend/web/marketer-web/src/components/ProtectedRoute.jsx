import { Navigate } from 'react-router-dom';
import { isLoggedIn, getRole } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  const role = getRole();
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;