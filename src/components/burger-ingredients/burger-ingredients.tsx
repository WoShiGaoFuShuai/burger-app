import React, { useState } from "react";
import cl from "@/components/burger-ingredients/burger-ingredients.module.css";
import IngredientsGroup from "@/components/burger-ingredients/ingredients-group/ingredients-group";

import TabsRender from "@/components/tabs/tabs";
import { tabsValues } from "@/utils/tabs-data";
import { useSelector } from "react-redux";
import { ingredientsSelectors } from "@/services/ingredients/reducer";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("one");

  const buns = useSelector(ingredientsSelectors.ingredientsBuns);
  const sauces = useSelector(ingredientsSelectors.ingredientsSauces);
  const mains = useSelector(ingredientsSelectors.ingredientsMains);

  return (
    <section className={cl.wrapper}>
      <p className={`text text_type_main-large ${cl.title}`}>Соберите бургер</p>

      {/* TABS */}
      <TabsRender tabs={tabsValues} current={current} setCurrent={setCurrent} />

      <div className={cl.ingredients__wrapper}>
        {/* //BUNS  */}
        <IngredientsGroup title="Булки" array={buns} />

        {/* //MAIN  */}
        <IngredientsGroup title="Начинки" array={mains} />

        {/* SAUCES  */}
        <IngredientsGroup title="Соусы" array={sauces} />
      </div>
    </section>
  );
};

export default BurgerIngredients;
