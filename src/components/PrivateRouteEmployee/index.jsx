// src/components/PrivateRouteEmployee/index.jsx
import { Navigate } from "react-router-dom";

export default function PrivateRouteEmployee({ children }) {
  const token = localStorage.getItem("employeeToken");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

