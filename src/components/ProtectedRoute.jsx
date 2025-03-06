import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../UserContext"; // Import useUser hook

const ProtectedRoute = () => {
  const { isAuthenticated } = useUser(); // ✅ Use isAuthenticated instead of token

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
