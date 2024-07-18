import { Data } from "@/utils/interfaces";

export interface IngredientItemProps {
  array: Data[];
}

export interface IngredientsGroupProps extends IngredientItemProps {
  title: string;
}
