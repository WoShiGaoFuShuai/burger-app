import React from "react";
import cl from "./order-details.module.css";
import doneImg from "@/images/done.png";

const OrderDetails = () => {
  return (
    <div className={cl.order__content}>
      <p className={cl.order__number}>034536</p>
      <p className={cl.order__text}>идентификатор заказа</p>

      <img className={cl.order__img} src={doneImg} alt="Done" />

      <p className={cl.order__text_start}>Ваш заказ начали готовить</p>

      <p className={cl.order__text_wait}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
