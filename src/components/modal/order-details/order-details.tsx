import React from "react";
import cl from "./order-details.module.css";
import doneImg from "@/images/done.png";
import { useSelector } from "react-redux";
import { orderInfoSelectors } from "@/services/create-order/reducer";

const OrderDetails = () => {
  const currentOrder = useSelector(orderInfoSelectors.getOrder);

  return (
    <div className={cl.order__content}>
      <p className={cl.order__number}>{currentOrder?.order.number ?? "0000"}</p>
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
