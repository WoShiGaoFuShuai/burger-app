import React, { useState } from "react";
import cl from "./burger-constructor.module.css";
import ConstructorSubmit from "@/components/burger-constructor/constructor-submit/constructor-submit";
import ConstructorElements from "@/components/burger-constructor/constructor-elements/constructor-elements";
import Modal from "@/components/modal/modal";
import OrderDetails from "@/components/modal/order-details/order-details";
import { useSelector } from "react-redux";
import { RootState } from "@/services/reducer";

const BurgerConstructor = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const ingredientsConstructor = useSelector(
    (state: RootState) => state.burgerConstructor
  );

  return (
    <section className={cl.wrapper}>
      <ConstructorElements ingredientsConstructor={ingredientsConstructor} />

      <ConstructorSubmit setIsShowModal={setIsShowModal} />

      {isShowModal && (
        <Modal onClose={() => setIsShowModal(false)}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
