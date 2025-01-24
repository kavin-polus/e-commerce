
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({isAuthenticated,children}) => {
  
  return children;
}

export default ProtectedRoute;
