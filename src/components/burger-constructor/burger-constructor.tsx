import React, { useState } from "react";
import cl from "./burger-constructor.module.css";
import ConstructorSubmit from "../burger-constructor/constructor-submit/constructor-submit";
import ConstructorElements from "../burger-constructor/constructor-elements/constructor-elements";
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import Loader from "../ui/loader/loader";
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import {
  clearOrder,
  orderInfoSelectors,
} from "../../services/create-order/reducer";

const BurgerConstructor = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const { loading } = useAppSelector(orderInfoSelectors.getOrdersInfoState);
  const dispatch = useAppDispatch();

  if (loading) {
    return <Loader text="Оформляем заказ, подождите"></Loader>;
  }

  //close modal and delete order from store
  const handleCloseModal = () => {
    setIsShowModal(false);

    //clear order from store
    dispatch(clearOrder());
  };

  return (
    <section className={cl.wrapper}>
      <ConstructorElements />
      <ConstructorSubmit setIsShowModal={setIsShowModal} />

      {isShowModal && (
        <Modal onClose={() => handleCloseModal()}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
