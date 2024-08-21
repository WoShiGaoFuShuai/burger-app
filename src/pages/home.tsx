import React, { useEffect } from "react";
import BurgerIngredients from "@/components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "@/components/burger-constructor/burger-constructor";
import Loader from "@/components/ui/loader/loader";

import { loadIngredients } from "@/services/ingredients/actions";
import { useAppSelector, useAppDispatch } from "@/services/hooks";
import { RootState } from "@/services/reducer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const HomePage = () => {
  const dispatch = useAppDispatch();

  const { ingredients, loading } = useAppSelector(
    (state: RootState) => state.ingredients
  );

  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

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
