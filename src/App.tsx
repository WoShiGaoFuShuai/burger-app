import React, { useEffect, useState } from "react";
import "@/App.css";
import AppHeader from "@/components/header/app-header";
import BurgerIngredients from "@/components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "@/components/burger-constructor/burger-constructor";
import PostService from "@/API/post-service";
import { IngredientsData } from "@/types/interface.ingredients";
import Loader from "@/components/ui/loader/loader";

function App() {
  const [ingredientsData, setIngredientsData] = useState<IngredientsData[]>([]);
  const [isFetchError, setIsFetchError] = useState(false);
  const [isFetchLoading, setIsFetchLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetchLoading(true);
        const response = await PostService.getAll();
        setIngredientsData(response.data);
      } catch (e) {
        setIsFetchError(!isFetchError);
        console.error("Failed to fetch data", e);
      } finally {
        setIsFetchLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {isFetchLoading ? (
        <Loader text="Подождите, идёт загрузка" />
      ) : (
        <>
          <AppHeader />

          <main className="main">
            <BurgerIngredients ingredientsData={ingredientsData} />

            <BurgerConstructor ingredientsData={ingredientsData} />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
