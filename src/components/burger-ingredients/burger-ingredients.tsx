import React from "react";
import cl from "@/components/burger-ingredients/burger-ingredients.module.css";
import IngredientsGroup from "@/components/burger-ingredients/ingredients-group/ingredients-group";
import { dataBuns, dataSauce } from "@/utils/data";

// import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import TabsRender from "@/components/ui/tabs/tabs-render";
import { TabValue } from "@/components/ui/tabs/interfaces.tabs-render";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("one");
  const tabsValues: TabValue[] = [
    { value: "one", name: "Булки" },
    { value: "two", name: "Соусы" },
    { value: "three", name: "Начинки" },
  ];

  return (
    <section className={cl.wrapper}>
      <p className={`text text_type_main-large ${cl.title}`}>Соберите бургер</p>

      {/* TABS */}
      <TabsRender tabs={tabsValues} current={current} setCurrent={setCurrent} />

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
