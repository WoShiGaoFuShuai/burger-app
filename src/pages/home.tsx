import React from "react";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Loader from "../components/ui/loader/loader";

import { useAppSelector } from "../services/hooks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ingredientsSelectors } from "../services/ingredients/reducer";

const HomePage = () => {
  const { ingredients, loading } = useAppSelector(
    ingredientsSelectors.getAllIngredients
  );

  if (loading) {
    return <Loader text="Подождите, идёт загрузка" />;
  }

  const noIngredients = !loading && !ingredients.length;
  return (
    <DndProvider backend={HTML5Backend}>
      <main className="main">
        {noIngredients ? (
          <p className="text text_type_main-medium">Извините, нет данных</p>
        ) : (
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        )}
      </main>
    </DndProvider>
  );
};

export default HomePage;
