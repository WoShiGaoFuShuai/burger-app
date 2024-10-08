import React, { useState, useMemo } from "react";
import AccountLinks from "@/components/account/account-links";
import cl from "./profile.module.css";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import { logoutUser, updateUserInfo } from "@/services/auth/actions";
import { getAccessToken, getRefreshToken } from "@/utils/local-storage";
import { authSelectors } from "@/services/auth/reducer";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ProfileInfoInputs from "@/components/profile-info-inputs/profile-info-inputs";
import FeedOrderCard from "@/components/feed/feed-order-card/feed-order-card";

export interface AccountLinkObject {
  title: string;
  active?: boolean;
  onClick: () => void;
}

const ProfilePage = () => {
  const { user } = useAppSelector(authSelectors.getAuthState);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

    return sameName && sameEmail && samePassword;
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
        <Route path="orders" element={<FeedOrderCard mw="844" />} />
      </Routes>
    </div>
  );
};

export default ProfilePage;
