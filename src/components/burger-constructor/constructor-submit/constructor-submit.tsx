import React from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./constructor-submit.module.css";

const ConstructorSubmit = () => {
  return (
    <section className={cl.submit__wrapper}>
      <div className={cl.submit__price}>
        <p className="text text_type_digits-medium">610</p>
        <CurrencyIcon type="primary" />
      </div>

      <Button htmlType="button" type="primary" size="large">
        Оформить заказ
      </Button>
    </section>
  );
};

export default ConstructorSubmit;
