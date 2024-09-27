import React, { useState, useMemo, useEffect } from "react";
import AccountLinks from "@/components/account/account-links";
import cl from "./profile.module.css";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import { logoutUser, updateUserInfo } from "@/services/auth/actions";
import { getAccessToken, getRefreshToken } from "@/utils/local-storage";
import { authSelectors } from "@/services/auth/reducer";
import Loader from "@/components/ui/loader/loader";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ProfileInfoInputs from "@/components/profile-info-inputs/profile-info-inputs";
import FeedOrderCard from "@/components/feed/feed-order-card/feed-order-card";
import { ordersFeedProfileSelectors } from "@/services/orders-feed-profile/reducer";
import {
  URL_FEED_ORDERS_PROFILE,
  wsConnectProfile,
  wsDisconnectProfile,
} from "@/services/orders-feed-profile/actions";
import { ingredientsSelectors } from "@/services/ingredients/reducer";

export interface AccountLinkObject {
  title: string;
  active?: boolean;
  onClick: () => void;
}

const ProfilePage = () => {
  const { loading, loadingText, user } = useAppSelector(
    authSelectors.getAuthState
  );

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const { orders } = useAppSelector(
    ordersFeedProfileSelectors.getOrdersFeedProfileState
  );
  console.log("orders", orders);
  const { ingredients } = useAppSelector(
    ingredientsSelectors.getAllIngredients
  );
  console.log("inngred", ingredients);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const accessToken = getAccessToken();
    console.log(accessToken);
    dispatch(
      wsConnectProfile(`${URL_FEED_ORDERS_PROFILE}?token=${accessToken}`)
    );

    return () => {
      dispatch(wsDisconnectProfile());
    };
  }, [dispatch]);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleOrderHistoryClick = () => {
    navigate("orders");
  };

  const handleLogoutClick = () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return;
    dispatch(logoutUser(refreshToken));
  };

  const accLinks: AccountLinkObject[] = [
    {
      title: "Профиль",
      active: location.pathname === "/profile",
      onClick: handleProfileClick,
    },
    {
      title: "История заказов",
      active: location.pathname === "/profile/orders",
      onClick: handleOrderHistoryClick,
    },
    { title: "Выход", onClick: handleLogoutClick },
  ];

  // SHOW BTNS DIV or not
  const initialFormState = {
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  };

  const displayStyle = useMemo(() => {
    const sameName = initialFormState.name === name;
    const sameEmail = initialFormState.email === email;
    const samePassword = initialFormState.password === password;

    if (sameName && sameEmail && samePassword) return true;
    return false;
  }, [
    name,
    email,
    password,
    initialFormState.email,
    initialFormState.name,
    initialFormState.password,
  ]);

  const resetFormToInitialState = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPassword("");
  };

  const changeUserInfo = async () => {
    const newInfo = { email, password, name };
    const accessToken = getAccessToken();
    if (!accessToken) return;

    dispatch(updateUserInfo({ newInfo, accessToken }));
  };

  // Loading screen
  if (loading) {
    return <Loader text={loadingText} />;
  }

  if (!orders.length) {
    console.log("IF in !orders.length");
    return (
      <p className="text text_type_main-middle">
        Загружаем вашу ленту заказов...
      </p>
    );
  }

  return (
    <div className={cl.profile__wrapper}>
      <AccountLinks accLinks={accLinks} />

      <Routes>
        <Route
          path="/"
          element={
            <ProfileInfoInputs
              name={name}
              setName={setName}
              password={password}
              setPassword={setPassword}
              email={email}
              setEmail={setEmail}
              displayStyle={displayStyle}
              resetFormToInitialState={resetFormToInitialState}
              changeUserInfo={changeUserInfo}
            />
          }
        />
        <Route
          path="orders"
          element={<FeedOrderCard orders={orders} ingredients={ingredients} />}
        />
      </Routes>
    </div>
  );
};

export default ProfilePage;
