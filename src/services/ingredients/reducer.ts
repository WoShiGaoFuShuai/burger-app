import { IngredientsData } from "@/types/interface.ingredients";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/services/store";

import { loadIngredients } from "@/services/ingredients/actions";

export interface IngredientsState {
  ingredients: IngredientsData[];
  error: null | string;
  loading: boolean;
}

const initialState: IngredientsState = {
  ingredients: [],
  error: null,
  loading: false,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadIngredients.fulfilled,
        (state, action: PayloadAction<IngredientsData[]>) => {
          state.ingredients = action.payload;
          state.error = null;
          state.loading = false;
        }
      )
      .addCase(loadIngredients.rejected, (state, action) => {
        state.error = action.error.message || "Неизвестная ошибка";
        state.loading = false;
      });
  },
});

export const ingredientsSelectors = {
  getAllIngredients: (state: RootState) => state.ingredients,
  ingredientsBuns: createSelector(
    (state: RootState) => state.ingredients.ingredients,
    (ingredients: IngredientsData[]) =>
      ingredients.filter((item: IngredientsData) => item.type === "bun")
  ),

  ingredientsSauces: createSelector(
    (state: RootState) => state.ingredients.ingredients,
    (ingredients: IngredientsData[]) =>
      ingredients.filter((item: IngredientsData) => item.type === "sauce")
  ),

  ingredientsMains: createSelector(
    (state: RootState) => state.ingredients.ingredients,
    (ingredients: IngredientsData[]) =>
      ingredients.filter((item: IngredientsData) => item.type === "main")
  ),
};

export default ingredientsSlice.reducer;
