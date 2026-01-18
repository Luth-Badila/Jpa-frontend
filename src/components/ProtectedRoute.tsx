import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { session } = useAuth();
  const location = useLocation();

  // If no session exists, redirect to login
  // state={{ from: location }} allows us to send them back where they were after login
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
