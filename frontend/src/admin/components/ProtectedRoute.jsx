import { Navigate } from "react-router-dom";
import useAdminAuth from "../../hooks/useAdminAuth";

export default function ProtectedRoute({ children, allow = [] }) {
  const { isAuthenticated, role } = useAdminAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  if (allow.length && !allow.includes(role)) return <Navigate to="/admin" replace />;
  return children;
}
