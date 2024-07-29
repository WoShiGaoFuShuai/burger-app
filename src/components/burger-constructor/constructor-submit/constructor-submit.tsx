import React from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./constructor-submit.module.css";

interface ConstructorSubmitProps {
  setIsShowModal: (value: boolean) => void;
}

const ConstructorSubmit: React.FC<ConstructorSubmitProps> = ({
  setIsShowModal,
}) => {
  return (
    <section className={cl.submit__wrapper}>
      <div className={cl.submit__price}>
        <p className="text text_type_digits-medium">610</p>
        <CurrencyIcon type="primary" />
      </div>

      <Button
        onClick={() => setIsShowModal(true)}
        htmlType="button"
        type="primary"
        size="large"
      >
        Оформить заказ
      </Button>
    </section>
  );
};

export default ConstructorSubmit;
