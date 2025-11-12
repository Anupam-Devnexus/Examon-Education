/* ProtectedRoute.jsx */
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../Zustand/UserData";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token } = useAuthStore();

  // Check both Zustand state & persisted token
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
