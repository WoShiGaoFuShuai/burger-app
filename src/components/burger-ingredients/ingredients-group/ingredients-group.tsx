import React from "react";

import cl from "./ingredients-group.module.css";
import { IngredientsGroupProps } from "@/components/burger-ingredients/interfaces.burger-ingredients";
import IngredientItem from "../ingredient-item/ingredient-item";

const IngredientsGroup: React.FC<IngredientsGroupProps> = ({
  array,
  title,
}) => {
  return (
    <div className="mb-10">
      <p className={`${cl.title} mb-6`}>{title}</p>

      <ul className={cl.ingredients__items_wrapper}>
        <IngredientItem array={array} />
      </ul>
    </div>
  );
};

export default IngredientsGroup;
