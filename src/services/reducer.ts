import { combineSlices } from "@reduxjs/toolkit";
import ingredientsSlice from "@/services/ingredients/reducer";
import itemShowInModalSlice from "@/services/item-show-in-modal/reducer";
import burgerConstructorSlice from "@/services/burger-constructor/reducer";
import orderInfoSlice from "@/services/create-order/reducer";

export const rootReducer = combineSlices({
  ingredients: ingredientsSlice,
  burgerConstructor: burgerConstructorSlice,
  itemShowInModal: itemShowInModalSlice,
  orderInfo: orderInfoSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
