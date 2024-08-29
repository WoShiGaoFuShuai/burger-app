import React, { useState, useRef, useMemo } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AccountLinks from "@/components/account/account-links";
import cl from "./profile.module.css";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import { logoutUser, updateUserInfo } from "@/services/auth/actions";
import { getAccessToken, getRefreshToken } from "@/utils/local-storage";
import { authSelectors } from "@/services/auth/reducer";
import Loader from "@/components/ui/loader/loader";

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

  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const onIconClick = () => {
    if (passwordRef.current) {
      setTimeout(() => passwordRef.current!.focus(), 0);
      alert("Icon Click Callback");
    }
  };

  const handleProfileClick = () => {};

  const handleOrderHistoryClick = () => {};

  const handleLogoutClick = () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return;
    dispatch(logoutUser(refreshToken));
  };

  const accLinks: AccountLinkObject[] = [
    { title: "Профиль", active: true, onClick: handleProfileClick },
    { title: "История заказов", onClick: handleOrderHistoryClick },
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

  return (
    <div className={cl.profile__wrapper}>
      <AccountLinks accLinks={accLinks} />

      <div className={cl.profile__inputs}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={"name"}
          error={false}
          icon={"EditIcon"}
          errorText={"Ошибка"}
          size={"default"}
        ></Input>

        <Input
          type={"email"}
          placeholder={"Логин"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"email"}
          error={false}
          icon={"EditIcon"}
          errorText={"Ошибка"}
          size={"default"}
        ></Input>

        <Input
          type={"password"}
          placeholder={"Введите новый пароль"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={"password"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          onIconClick={onIconClick}
          icon={"EditIcon"}
          ref={passwordRef}
        ></Input>

        <div className={`${cl.btns__wrapper} ${displayStyle ? cl.d_none : ""}`}>
          <Button
            onClick={resetFormToInitialState}
            htmlType="button"
            type="secondary"
            size="medium"
          >
            Отмена
          </Button>

          <Button
            onClick={changeUserInfo}
            htmlType="button"
            type="primary"
            size="medium"
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
