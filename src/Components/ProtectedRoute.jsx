import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRole })  {

  const { role } = useAuth();
    
  if (!role) {
    return <Navigate to="/login" />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
