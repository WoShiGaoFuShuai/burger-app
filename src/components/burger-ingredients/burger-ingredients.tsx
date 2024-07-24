import React from "react";
import cl from "@/components/burger-ingredients/burger-ingredients.module.css";
import IngredientsGroup from "@/components/burger-ingredients/ingredients-group/ingredients-group";
import { dataBuns, dataSauce } from "@/utils/data";
import { IngredientsProps } from "@/types/ingredients-props";

import TabsRender from "@/components/tabs-render/tabs-render";
import { TabValue } from "@/components/tabs-render/interfaces.tabs-render";

const BurgerIngredients: React.FC<IngredientsProps> = ({ ingredientsData }) => {
  const [current, setCurrent] = React.useState("one");
  const tabsValues: TabValue[] = [
    { value: "one", name: "Булки" },
    { value: "two", name: "Соусы" },
    { value: "three", name: "Начинки" },
  ];

  const buns = ingredientsData.filter((item) => item.type === "bun");
  const sauces = ingredientsData.filter((item) => item.type === "sauce");

  return (
    <section className={cl.wrapper}>
      <p className={`text text_type_main-large ${cl.title}`}>Соберите бургер</p>

      {/* TABS */}
      <TabsRender tabs={tabsValues} current={current} setCurrent={setCurrent} />

      <div className={cl.ingredients__wrapper}>
        {/* //BUNS  */}
        <IngredientsGroup title="Булки" array={buns} />

        {/* SAUCES  */}
        <IngredientsGroup title="Соусы" array={sauces} />
      </div>
    </section>
  );
};

export default BurgerIngredients;
