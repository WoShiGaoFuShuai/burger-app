import React, { useRef, useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import FormLinks from "@/components/ui/form/form-links";
import { loginLinks } from "@/utils/reg-links-data";
import AppForm from "@/components/ui/form/app-form";
import { UserAuthLogin } from "@/utils/auth";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import { loginUser } from "@/services/auth/actions";
import { authSelectors } from "@/services/auth/reducer";
import Loader from "@/components/ui/loader/loader";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, loadingText } = useAppSelector(authSelectors.getAuthState);
  const location = useLocation();

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onIconClick = () => {
    if (passwordRef.current) {
      setTimeout(() => passwordRef.current!.focus(), 0);
      alert("Icon Click Callback");
    }
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData: UserAuthLogin = {
      email,
      password,
    };

    try {
      const response = await dispatch(loginUser(formData)).unwrap();

      if (response.success) {
        const redirectPath = location.state.from.pathname ?? "/";
        return navigate(redirectPath);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Loader text={loadingText} />;
  }

  const inputs = (
    <>
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

  return (
    <div className="reg__wrapper">
      <AppForm
        onSubmit={handleOnSubmit}
        title="Вход"
        inputs={inputs}
        btnText="Войти"
      />
      <FormLinks links={loginLinks} />
    </div>
  );
};

export default LoginPage;
