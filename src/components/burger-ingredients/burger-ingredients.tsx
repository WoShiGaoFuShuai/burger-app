import React from "react";
import cl from "@/components/burger-ingredients/burger-ingredients.module.css";
import IngredientsGroup from "@/components/burger-ingredients/ingredients-group/ingredients-group";
import { dataBuns, dataSauce } from "@/utils/data";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("one");
  return (
    <section className={cl.wrapper}>
      <p className={`text text_type_main-large ${cl.title}`}>Соберите бургер</p>

      {/* TABS */}
      <div className={cl.tabs} style={{ display: "flex" }}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={cl.ingredients__wrapper}>
        {/* //BUNS  */}
        <IngredientsGroup title="Булки" array={dataBuns} />

        {/* SAUCES  */}
        <IngredientsGroup title="Соусы" array={dataSauce} />
      </div>
    </section>
  );
};

export default BurgerIngredients;
