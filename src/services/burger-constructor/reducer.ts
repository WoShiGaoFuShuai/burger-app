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

    clearState: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const burgerConstructorSelectors = {
  getAllBurgerConstructorState: (state: RootState) => state.burgerConstructor,
  getTotalPrice: createSelector(
    (state: RootState) => state.burgerConstructor,
    (burgerConstructor) => {
      const totalPriceIngredients = burgerConstructor.ingredients.reduce(
        (acc, current) => acc + current.price,
        0
      );

      let totalPriceBuns = 0;
      if (burgerConstructor.bun) {
        totalPriceBuns = burgerConstructor.bun.price * 2;
      }

      return totalPriceIngredients + totalPriceBuns;
    }
  ),
  getIdsForOrder: createSelector(
    (state: RootState) => state.burgerConstructor,
    (burgerConstructor) => {
      if (burgerConstructor.bun) {
        const allIds = [
          burgerConstructor.bun._id,
          ...burgerConstructor.ingredients.map((item) => item._id),
          burgerConstructor.bun._id,
        ];
        return allIds;
      }
    }
  ),
};

export const {
  addConstructorItem,
  removeConstructorItem,
  moveConstructorIngredient,
  clearState,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
