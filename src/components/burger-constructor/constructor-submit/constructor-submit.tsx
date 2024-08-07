import React from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./constructor-submit.module.css";
import { burgerConstructorSelectors } from "@/services/burger-constructor/reducer";
import { sendOrder } from "@/services/create-order/actions";
import { OrderData } from "@/API/order-service";
import { useAppSelector, useAppDispatch } from "@/services/hooks";

interface ConstructorSubmitProps {
  setIsShowModal: (value: boolean) => void;
}

const ConstructorSubmit: React.FC<ConstructorSubmitProps> = ({
  setIsShowModal,
}) => {
  const dispatch = useAppDispatch();

  const totalPrice = useAppSelector(burgerConstructorSelectors.getTotalPrice);
  const burgerConstructorState = useAppSelector(
    burgerConstructorSelectors.getAllBurgerConstructorState
  );

  // all IDs for sending them to API
  const allIds = useAppSelector(burgerConstructorSelectors.getIdsForOrder);

  const disabled =
    !burgerConstructorState.bun || !burgerConstructorState.ingredients.length;

  const handleSendOrder = () => {
    if (!allIds) return;

    setIsShowModal(true);
    const dataOrder: OrderData = {
      ingredients: [...allIds],
    };
    dispatch(sendOrder(dataOrder));
  };

  return (
    <section className={cl.submit__wrapper}>
      <div className={cl.submit__price}>
        <p className="text text_type_digits-medium">{totalPrice}</p>
        <CurrencyIcon type="primary" />
      </div>

      <Button
        onClick={() => handleSendOrder()}
        htmlType="button"
        type="primary"
        size="large"
        disabled={disabled}
      >
        Оформить заказ
      </Button>
    </section>
  );
};

export default ConstructorSubmit;
