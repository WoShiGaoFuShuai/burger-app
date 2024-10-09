import React from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

interface AppFormProps {
  title: string;
  inputs: React.ReactNode;
  btnText: string;
  onSubmit: (e: React.FormEvent) => void;
}

const AppForm: React.FC<AppFormProps> = ({
  title,
  inputs,
  btnText,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="form">
      <p className="text text_type_main-medium">{title}</p>
      {inputs}

      <Button htmlType="submit" type="primary" size="large" data-login-btn>
        {btnText}
      </Button>
    </form>
  );
};

export default AppForm;
