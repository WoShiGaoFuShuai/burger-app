import React, { useState, useMemo } from "react";
import cl from "@/components/burger-ingredients/burger-ingredients.module.css";
import IngredientsGroup from "@/components/burger-ingredients/ingredients-group/ingredients-group";
// import { IngredientsProps } from "@/types/ingredients-props";
import { RootState } from "@/services/reducer";

import TabsRender from "@/components/tabs/tabs";
import { tabsValues } from "@/utils/tabs-data";
import { useSelector } from "react-redux";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("one");
  const ingredientsData = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );

  const buns = useMemo(
    () => ingredientsData.filter((item) => item.type === "bun"),
    [ingredientsData]
  );
  const sauces = useMemo(
    () => ingredientsData.filter((item) => item.type === "sauce"),
    [ingredientsData]
  );

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
