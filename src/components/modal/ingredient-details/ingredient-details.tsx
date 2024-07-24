import React from "react";
import cl from "./ingredient-details.module.css";
import { IngredientsData } from "@/types/interface.ingredients";

interface IngredientDetailsProps {
  item: IngredientsData | null;
}

const IngredientDetails: React.FC<IngredientDetailsProps> = ({ item }) => {
  if (!item) {
    throw new Error("Element which was clicked do not have correct data");
  }

  const ingredientInfoTitles = [
    { title: "Калории, ккал", type: "calories" },
    { title: "Белки, г", type: "proteins" },
    { title: "Жиры, г", type: "fat" },
    { title: "Углеводы, г", type: "carbohydrates" },
  ];

  return (
    <div>
      <img className="mb-4" src={item.image_large} alt="Ingredient" />
      <p className={cl.name}>{item.name}</p>
      <ul className={cl.info__wrapper}>
        {ingredientInfoTitles.map((ingredient) => (
          <li key={ingredient.title} className={cl.info__item}>
            <span className="text text_type_main-default">
              {ingredient.title}
            </span>

            <span className="text text_type_digits-default">
              {item[ingredient.type as keyof IngredientsData]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientDetails;
