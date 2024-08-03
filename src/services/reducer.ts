import { combineSlices } from "@reduxjs/toolkit";
import ingredientsReducer from "@/services/ingredients/reducer";
import { burgerConstructorReducer } from "@/services/burger-constructor/reducer";

export const rootReducer = combineSlices({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
