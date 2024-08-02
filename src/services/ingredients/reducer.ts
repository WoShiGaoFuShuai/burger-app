import {
  GET_INGREDIENTS_LOADING,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
} from "@/services/ingredients/actions";
import { IngredientsData } from "@/types/interface.ingredients";

export interface IngredientsState {
  ingredients: IngredientsData[];
  error: boolean;
  loading: boolean;
}

const initialStore: IngredientsState = {
  ingredients: [],
  error: false,
  loading: false,
};

export const ingredientsReducer = (state = initialStore, action: any) => {
  switch (action.type) {
    case GET_INGREDIENTS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: (action.payload as IngredientsData[]) || [],
        error: false,
        loading: false,
      };

    case GET_INGREDIENTS_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };

    default: {
      return state;
    }
  }
};
