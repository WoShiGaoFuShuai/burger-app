import React, { useRef } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./profile-info-inputs.module.css";

interface ProfileInfoInputsProps {
  setName: (e: string) => void;
  setEmail: (e: string) => void;
  setPassword: (e: string) => void;
  resetFormToInitialState: () => void;
  changeUserInfo: () => void;
  name: string;
  email: string;
  password: string;
  displayStyle: boolean;
}

const ProfileInfoInputs: React.FC<ProfileInfoInputsProps> = ({
  setName,
  name,
  setEmail,
  email,
  setPassword,
  password,
  displayStyle,
  resetFormToInitialState,
  changeUserInfo,
}) => {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const onIconClick = () => {
    if (passwordRef.current) {
      setTimeout(() => passwordRef.current!.focus(), 0);
      alert("Icon Click Callback");
    }
  };

  return (
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
  );
};

export default ProfileInfoInputs;
