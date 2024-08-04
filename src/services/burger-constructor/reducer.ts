import { IngredientsDataWithKey } from "@/types/interface.ingredients";
import {
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface BurgerConstructorState {
  bun: IngredientsDataWithKey | null;
  ingredients: IngredientsDataWithKey[];
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: "burger-constructor",
  initialState,
  reducers: {
    addConstructorItem: {
      reducer: (state, action: PayloadAction<IngredientsDataWithKey>) => {
        if (action.payload.type === "bun") {
          state.bun = action.payload;
          return;
        }
        state.ingredients.push(action.payload);
      },
      prepare: (newItem) => {
        return { payload: { ...newItem, key: nanoid() } };
      },
    },

    removeConstructorItem: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.key !== action.payload
      );
    },

    moveConstructorIngredient: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const [draggedItem] = state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, draggedItem);
    },
  },
});

export const burgerConstructorSelectors = {
  getAllBurgerConstructorState: (state: RootState) => state.burgerConstructor,
  ingredientsBurgerConstructor: createSelector(
    (state: RootState) => state.burgerConstructor.ingredients,
    (ingredients) => ingredients
  ),
};

export const {
  addConstructorItem,
  removeConstructorItem,
  moveConstructorIngredient,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;

// const dragIngredient = state.ingredients[action.payload.dragIndex];

// const newIngredients = [...state.ingredients];
// newIngredients.splice(action.payload.dragIndex, 1);
// newIngredients.splice(action.payload.hoverIndex, 0, dragIngredient);

// state.ingredients = newIngredients;
