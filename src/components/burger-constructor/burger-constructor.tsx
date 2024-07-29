import React, { useState } from "react";
import cl from "./burger-constructor.module.css";
import { dataConstructor } from "@/utils/data";
import ConstructorSubmit from "@/components/burger-constructor/constructor-submit/constructor-submit";
import ConstructorElements from "@/components/burger-constructor/constructor-elements/constructor-elements";
import { IngredientsProps } from "@/types/ingredients-props";
import Modal from "@/components/modal/modal";
import OrderDetails from "@/components/modal/order-details/order-details";

const BurgerConstructor: React.FC<IngredientsProps> = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <section className={cl.wrapper}>
      <ConstructorElements ingredientsData={dataConstructor} />

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
