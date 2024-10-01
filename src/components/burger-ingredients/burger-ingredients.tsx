import React, { useEffect, useRef, useState } from "react";
import cl from "@/components/burger-ingredients/burger-ingredients.module.css";
import IngredientsGroup from "@/components/burger-ingredients/ingredients-group/ingredients-group";

import TabsRender from "@/components/tabs/tabs";
import { tabsValues } from "@/utils/tabs-data";
import { useAppSelector } from "@/services/hooks";
import { ingredientsSelectors } from "@/services/ingredients/reducer";
import { scrollTabHandler } from "@/utils/scroll";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("one");

  //click and scroll to the active tab
  const handleClickTab = (value: string) => {
    setCurrent(value);

    if (value === "one") scrollTabHandler(bunsRef);
    if (value === "two") scrollTabHandler(mainsRef);
    if (value === "three") scrollTabHandler(saucesRef);
  };

  // passing data
  const buns = useAppSelector(ingredientsSelectors.ingredientsBuns);
  const sauces = useAppSelector(ingredientsSelectors.ingredientsSauces);
  const mains = useAppSelector(ingredientsSelectors.ingredientsMains);

  // REFS for scrolling and changing active tabs
  const ingredientsWrapperRef = useRef<HTMLDivElement | null>(null);
  const bunsRef = useRef<HTMLDivElement | null>(null);
  const mainsRef = useRef<HTMLDivElement | null>(null);
  const saucesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ingredientsWrapper = ingredientsWrapperRef.current;

    if (!ingredientsWrapper) return;

    const handleScroll = () => {
      // when scroll check all positions of items
      const bunsRect = bunsRef.current?.getBoundingClientRect();
      const mainsRect = mainsRef.current?.getBoundingClientRect();
      const saucesRect = saucesRef.current?.getBoundingClientRect();
      const ingredientRef = ingredientsWrapper.getBoundingClientRect();

      if (!bunsRect || !mainsRect || !saucesRect) return;

      // calculate difference
      const distanceBuns = Math.abs(bunsRect.top - ingredientRef.top);
      const distanceMains = Math.abs(mainsRect.top - ingredientRef.top);
      const distanceSauces = Math.abs(saucesRect.top - ingredientRef.top);

      // find the smallest
      const minimumDistance = Math.min(
        distanceBuns,
        distanceMains,
        distanceSauces
      );

      // depends which distance is the smallest to the top of the tabs,
      // make this tab active
      if (minimumDistance === distanceBuns) {
        setCurrent("one");
      } else if (minimumDistance === distanceMains) {
        setCurrent("two");
      } else if (minimumDistance === distanceSauces) {
        setCurrent("three");
      }
    };

    ingredientsWrapper.addEventListener("scroll", handleScroll);

    return () => {
      ingredientsWrapper.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className={cl.wrapper}>
      <p className={`text text_type_main-large ${cl.title}`}>Соберите бургер</p>

      {/* TABS */}
      <TabsRender
        tabs={tabsValues}
        current={current}
        setCurrent={handleClickTab}
      />
      <div ref={ingredientsWrapperRef} className={cl.ingredients__wrapper}>
        {/* //BUNS  */}
        <IngredientsGroup ref={bunsRef} title="Булки" array={buns} />

        {/* //MAIN  */}
        <IngredientsGroup ref={mainsRef} title="Начинки" array={mains} />

        {/* SAUCES  */}
        <IngredientsGroup ref={saucesRef} title="Соусы" array={sauces} />
      </div>
    </section>
  );
};

export default BurgerIngredients;
