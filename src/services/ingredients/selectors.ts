import { RootState } from "@/services/reducer";

export const getAllIngredients = (state: RootState) =>
  state.ingredients.ingredients;
