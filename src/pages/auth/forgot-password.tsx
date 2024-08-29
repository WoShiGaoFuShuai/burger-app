import React, { useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import FormLinks from "@/components/ui/form/form-links";
import { forgotPasswordLinks } from "@/utils/reg-links-data";
import AppForm from "@/components/ui/form/app-form";
import AuthService from "@/API/auth-service";
import Loader from "@/components/ui/loader/loader";
import { useNavigate } from "react-router-dom";
import { setLsItem } from "@/utils/local-storage";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await AuthService.forgotPasswordRequest({ email });
      if (!data.success) throw new Error("Failed to send a code to your email");
      setLsItem("resetPasswordAccess", "true");
      navigate("/reset-password");
    } catch (error) {
      if (error instanceof Error) {
        return console.error(error.message);
      }
      return error;
    } finally {
      setLoading(false);
    }
  };

  const inputs = (
    <Input
      type={"email"}
      placeholder={"Укажите e-mail"}
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      name={"email"}
      error={false}
      errorText={"Ошибка"}
      size={"default"}
    ></Input>
  );

  if (loading) {
    return <Loader text="Отправляем письмо Вам на почту" />;
  }

  return (
    <div className="reg__wrapper">
      <AppForm
        onSubmit={handleOnSubmit}
        title="Восстановление пароля"
        inputs={inputs}
        btnText="Восстановить"
      />
      <FormLinks links={forgotPasswordLinks} />
    </div>
  );
};

export default ForgotPasswordPage;
