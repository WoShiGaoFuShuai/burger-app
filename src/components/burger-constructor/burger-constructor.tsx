import React from "react";
import cl from "./burger-constructor.module.css";
import { dataConstructor } from "@/utils/data";
import ConstructorSubmit from "@/components/burger-constructor/constructor-submit/constructor-submit";
import ConstructorElements from "@/components/burger-constructor/constructor-elements/constructor-elements";

const BurgerConstructor = () => {
  return (
    <section className={cl.wrapper}>
      <ConstructorElements dataConstructor={dataConstructor} />

      <ConstructorSubmit />
    </section>
  );
};

export default BurgerConstructor;
