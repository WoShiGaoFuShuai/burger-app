import React, { useRef, useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import FormLinks from "@/components/ui/form/form-links";
import { registrationLinks } from "@/utils/reg-links-data";
import AppForm from "@/components/ui/form/app-form";
import { UserAuthInterface } from "@/utils/auth";
import { registerUser } from "@/services/auth/actions";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import { authSelectors } from "@/services/auth/reducer";
import Loader from "@/components/ui/loader/loader";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, user, loadingText } = useAppSelector(
    authSelectors.getAuthState
  );
  const navigate = useNavigate();

  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const onIconClick = () => {
    if (passwordRef.current) {
      setTimeout(() => passwordRef.current!.focus(), 0);
      alert("Icon Click Callback");
    }
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData: UserAuthInterface = {
      name,
      email,
      password,
    };

    try {
      await dispatch(registerUser(formData));
      if (user && !loading) {
        navigate("/");
      }
    } catch (error) {
      if (error instanceof Error) return console.error(error.message);
      return error;
    }
  };

  const inputs = (
    <>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => setName(e.target.value)}
        value={name}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      ></Input>

      <Input
        type={"email"}
        placeholder={"E-mail"}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name={"email"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      ></Input>

      <Input
        type={"password"}
        placeholder={"Пароль"}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name={"password"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        onIconClick={onIconClick}
        icon={"ShowIcon"}
        ref={passwordRef}
      ></Input>
    </>
  );

  if (loading) {
    return <Loader text={loadingText} />;
  }

  return (
    <div className="reg__wrapper">
      <AppForm
        title="Регистрация"
        inputs={inputs}
        btnText="Зарегистрироваться"
        onSubmit={handleOnSubmit}
      />
      <FormLinks links={registrationLinks} />
    </div>
  );
};

export default RegistrationPage;
