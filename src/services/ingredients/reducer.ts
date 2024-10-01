import { IngredientsData } from "../../types/interface.ingredients";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../services/store";

import { loadIngredients } from "../../services/ingredients/actions";

export interface IngredientsState {
  ingredients: IngredientsData[];
  defaultIngredients: IngredientsData[];
  error: null | string;
  loading: boolean;
  previousBun: null | IngredientsData;
}

const initialState: IngredientsState = {
  ingredients: [],
  error: null,
  loading: false,
  previousBun: null,
  defaultIngredients: [],
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    addCounter: (state, action: PayloadAction<string>) => {
      // find element to update
      const itemToUpdate = state.ingredients.find(
        (item) => item._id === action.payload
      );

      if (!itemToUpdate) return;

      // index of the element
      const indexItemToUpdate = state.ingredients.indexOf(itemToUpdate);

      // check if it is a bun then add 2, if no - add 1
      if (itemToUpdate.type === "bun") {
        // check if we already added bun, if yes - remove counter from it before adding a new bun
        if (state.previousBun) {
          const indexPreviousBun = state.ingredients.findIndex(
            (item) => item._id === state.previousBun!._id
          );

          state.ingredients[indexPreviousBun].__v = 0;
        }
        state.ingredients[indexItemToUpdate].__v += 2;

        //put but to the store
        state.previousBun = itemToUpdate;
      } else {
        state.ingredients[indexItemToUpdate].__v += 1;
      }
    },

    subtractCounter: (state, action: PayloadAction<string>) => {
      const indexSubtractItem = state.ingredients.findIndex(
        (item) => item._id === action.payload
      );

      state.ingredients[indexSubtractItem].__v -= 1;
    },

    clearCounters: (state) => {
      state.ingredients = state.defaultIngredients;
    },
  },
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
          state.defaultIngredients = action.payload;
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

export const { addCounter, subtractCounter, clearCounters } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
