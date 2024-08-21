import React from "react";
import { authSelectors } from "@/services/auth/reducer";
import { useAppSelector } from "@/services/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { setLsItem } from "@/utils/local-storage";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { user } = useAppSelector(authSelectors.getAuthState);
  const location = useLocation();

  if (!user) {
    setLsItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
