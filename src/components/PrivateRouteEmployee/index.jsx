import { Navigate } from "react-router-dom";

export default function PrivateRouteEmployee({ children }) {
  const token = localStorage.getItem("employeeToken");
  if (!token) return <Navigate to="/employee-login" replace />;
  return children;
}
