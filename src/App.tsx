import React, { useEffect } from "react";
import "@/App.css";
import AppHeader from "@/components/header/app-header";
import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFoundPage,
} from "@/pages";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import { getUser } from "@/services/auth/actions";
import Loader from "@/components/ui/loader/loader";
import { authSelectors } from "./services/auth/reducer";
import { getAccessToken } from "@/utils/local-storage";
import ProtectedRoute from "@/components/protected-routes/protected-route/protected-route";
import GuestRoute from "@/components/protected-routes/guest-route/guest-route";
import ResetPasswordGuard from "@/components/protected-routes/guards/reset-password-guard/reset-password-guard";

function App() {
  const dispatch = useAppDispatch();
  const { loading, loadingText } = useAppSelector(authSelectors.getAuthState);

  useEffect(() => {
    const accessToken = getAccessToken();

    if (!accessToken) return;

    dispatch(getUser(accessToken));
  }, []);

  if (loading) {
    return <Loader text={loadingText} />;
  }

  return (
    <div className="App">
      <AppHeader />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/login"
          element={<GuestRoute element={<LoginPage />} />}
        ></Route>
        <Route
          path="/register"
          element={<GuestRoute element={<RegistrationPage />} />}
        ></Route>
        <Route
          path="/forgot-password"
          element={<GuestRoute element={<ForgotPasswordPage />} />}
        ></Route>
        <Route
          path="/reset-password"
          element={<ResetPasswordGuard element={<ResetPasswordPage />} />}
        ></Route>
        <Route
          path="/profile"
          element={<ProtectedRoute element={<ProfilePage />} />}
        ></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
