import { combineSlices } from "@reduxjs/toolkit";
import ingredientsReducer from "@/services/ingredients/reducer";
import itemShowInModalSlice from "@/services/item-show-in-modal/reducer";
import burgerConstructorSlice from "@/services/burger-constructor/reducer";

export const rootReducer = combineSlices({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorSlice,
  itemShowInModal: itemShowInModalSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
