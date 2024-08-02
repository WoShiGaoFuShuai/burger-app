import { combineReducers } from "redux";
import {
  ingredientsReducer,
  IngredientsState,
} from "@/services/ingredients/reducer";

export interface RootState {
  ingredients: IngredientsState;
}

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  // Добавьте другие редьюсеры здесь
});

export default rootReducer;
