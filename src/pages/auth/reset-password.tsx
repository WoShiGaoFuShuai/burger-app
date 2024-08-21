import React, { useRef, useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import FormLinks from "@/components/ui/form/form-links";
import { forgotPasswordLinks } from "@/utils/reg-links-data";
import AppForm from "@/components/ui/form/app-form";
import AuthService from "@/API/auth-service";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/ui/loader/loader";
import { removeLsItem } from "@/utils/local-storage";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const onIconClick = () => {
    if (passwordRef.current) {
      setTimeout(() => passwordRef.current!.focus(), 0);
      alert("Icon Click Callback");
    }
  };

  const inputs = (
    <>
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
        icon={"ShowIcon"}
        ref={passwordRef}
      ></Input>

      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={(e) => setCode(e.target.value)}
        value={code}
        name={"code"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      ></Input>
    </>
  );

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      password,
      token: code,
    };

    try {
      setLoading(true);
      const data = await AuthService.resetPasswordRequest(formData);
      if (!data.success) throw new Error("Failed to send a code to your email");
      removeLsItem("resetPasswordAccess");
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) return console.error(error.message);
      return error;
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Loader text="Обновляем Ваш пароль и перенаправляем на страницу 'Логин'" />
    );
  }

  return (
    <div className="reg__wrapper">
      <AppForm
        onSubmit={handleOnSubmit}
        title="Восстановление пароля"
        inputs={inputs}
        btnText="Сохранить"
      />
      <FormLinks links={forgotPasswordLinks} />
    </div>
  );
};

export default ResetPasswordPage;
