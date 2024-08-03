import React, { useEffect } from "react";
import "@/App.css";
import AppHeader from "@/components/header/app-header";
import BurgerIngredients from "@/components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "@/components/burger-constructor/burger-constructor";
import Loader from "@/components/ui/loader/loader";

import { useDispatch, useSelector } from "react-redux";
import { loadIngredients } from "@/services/ingredients/actions";
import { RootState } from "@/services/reducer";

function App() {
  const dispatch = useDispatch();

  const { ingredients, loading } = useSelector(
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
    <div className="App">
      <>
        <AppHeader />

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
      </>
    </div>
  );
}

export default App;
