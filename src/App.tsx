import React, { useEffect } from "react";
import "@/App.css";
import AppHeader from "@/components/header/app-header";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
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
import Modal from "./components/modal/modal";
import IngredientDetails from "./components/modal/ingredient-details/ingredient-details";
import {
  addItemShowInModal,
  clearItemShowInModal,
  itemShowInModalSelectors,
} from "./services/item-show-in-modal/reducer";
import { IngredientsData } from "./types/interface.ingredients";
import { getSsItem, removeSsItem } from "./utils/session-storage";

function App() {
  const dispatch = useAppDispatch();
  const { loading, loadingText } = useAppSelector(authSelectors.getAuthState);
  const location = useLocation();
  const navigate = useNavigate();

  const bg = location.state && location.state.bg;

  const selectedIngredient = useAppSelector(
    itemShowInModalSelectors.getItemShowInModal
  );

  const closeModal = () => {
    dispatch(clearItemShowInModal());
    removeSsItem("itemInModal");
    navigate(-1);
  };

  useEffect(() => {
    let sessionItemInModal = getSsItem("itemInModal");
    if (sessionItemInModal) {
      const parsedItem = JSON.parse(sessionItemInModal);
      dispatch(addItemShowInModal(parsedItem as IngredientsData));
    }
  }, [dispatch]);

  // IF we have accessToken => getUser
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

      <Routes location={bg || location}>
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
        <Route path="/ingredients/:id" element={<IngredientPage />} />

        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>

      {bg && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={closeModal}>
                <IngredientDetails item={selectedIngredient} />
              </Modal>
            }
          ></Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
