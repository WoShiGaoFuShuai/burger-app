import { IngredientsData } from "@/types/interface.ingredients";

export interface IngredientItemProps {
  array: IngredientsData[];
}

export interface IngredientsGroupProps extends IngredientItemProps {
  title: string;
}
