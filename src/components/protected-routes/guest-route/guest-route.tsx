import { authSelectors } from "@/services/auth/reducer";
import { useAppSelector } from "@/services/hooks";
import React from "react";
import { Navigate } from "react-router-dom";

interface GuestRouteProps {
  element: React.ReactElement;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ element }) => {
  const { user } = useAppSelector(authSelectors.getAuthState);
  if (user) {
    return <Navigate to="/" />;
  }

  return element;
};

export default GuestRoute;
