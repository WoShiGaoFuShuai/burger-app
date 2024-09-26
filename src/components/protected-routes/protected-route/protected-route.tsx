import React from "react";
import { authSelectors } from "@/services/auth/reducer";
import { useAppSelector } from "@/services/hooks";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { user, loading } = useAppSelector(authSelectors.getAuthState);
  const location = useLocation();

  if (loading) {
    return null;
  }

  // Если пользователь не авторизован, перенаправляем на /login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRoute;
