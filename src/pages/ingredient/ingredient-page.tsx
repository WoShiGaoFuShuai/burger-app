import React, { useEffect } from "react";
import IngredientDetails from "@/components/modal/ingredient-details/ingredient-details";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import { ingredientsSelectors } from "@/services/ingredients/reducer";
import { loadIngredients } from "@/services/ingredients/actions";
import cl from "./ingredient-page.module.css";

const IngredientPage = () => {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { ingredients } = useAppSelector(
    ingredientsSelectors.getAllIngredients
  );

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(loadIngredients());
    }
  }, [dispatch, ingredients.length]);

  const ingredient = ingredients.find((item) => item._id === params.id);

  if (!ingredient) return <p>Ингредиент не найден</p>;

  return (
    <div className={cl.wrapper}>
      <p className="text_type_main-large">Детали ингредиента</p>
      <IngredientDetails item={ingredient} />
    </div>
  );
};

export default IngredientPage;
