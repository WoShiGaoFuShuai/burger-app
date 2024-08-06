import React from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./constructor-submit.module.css";
import { useDispatch, useSelector } from "react-redux";
import { burgerConstructorSelectors } from "@/services/burger-constructor/reducer";
import { sendOrder } from "@/services/create-order/actions";
import { OrderData } from "@/API/order-service";

interface ConstructorSubmitProps {
  setIsShowModal: (value: boolean) => void;
}

const ConstructorSubmit: React.FC<ConstructorSubmitProps> = ({
  setIsShowModal,
}) => {
  const dispatch = useDispatch();

  const totalPrice = useSelector(burgerConstructorSelectors.getTotalPrice);
  const burgerConstructorState = useSelector(
    burgerConstructorSelectors.getAllBurgerConstructorState
  );

  // all IDs for sending them to API
  const allIds = useSelector(burgerConstructorSelectors.getIdsForOrder);

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
