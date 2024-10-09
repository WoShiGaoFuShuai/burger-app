import { IngredientsData } from "../types/interface.ingredients";

export const calculateTotalPrice = (
  allIngredients: IngredientsData[],
  orderIngredients: string[]
) => {
  let total = 0;

  orderIngredients.forEach((orderIngredient) => {
    const targetItem = allIngredients.find(
      (item) => item._id === orderIngredient
    );

    if (targetItem) total += targetItem.price;
  });

  return total;
};
