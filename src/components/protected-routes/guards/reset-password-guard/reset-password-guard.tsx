import { getLsItem } from "../../../../utils/local-storage";
import React from "react";
import { Navigate } from "react-router-dom";

interface ResetPasswordGuardProps {
  element: React.ReactElement;
}

const ResetPasswordGuard: React.FC<ResetPasswordGuardProps> = ({ element }) => {
  const resetPasswordAccess = getLsItem("resetPasswordAccess") === "true";

  if (!resetPasswordAccess) {
    return <Navigate to="/forgot-password" />;
  }

  return element;
};

export default ResetPasswordGuard;
