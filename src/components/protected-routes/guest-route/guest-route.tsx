import { authSelectors } from "@/services/auth/reducer";
import { useAppSelector } from "@/services/hooks";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface GuestRouteProps {
  element: React.ReactElement;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ element }) => {
  const { user, loading } = useAppSelector(authSelectors.getAuthState);
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <Navigate
        to={location.state?.from ?? "/"}
        state={location.state?.from?.state}
      />
    );
  }

  return element;
};

export default GuestRoute;
