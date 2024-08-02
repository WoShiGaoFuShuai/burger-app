import PostService, { ApiResponse } from "@/API/post-service";
import { IngredientsData } from "@/types/interface.ingredients";

export const GET_INGREDIENTS_LOADING = "GET_INGREDIENTS_LOADING";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";

export const loadIngredients = () => async (dispatch: any) => {
  dispatch({
    type: GET_INGREDIENTS_LOADING,
  });

  try {
    const response: ApiResponse = await PostService.getAll();
    if (response && response.success) {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: response.data as IngredientsData[],
      });
    }
  } catch (e) {
    dispatch({
      type: GET_INGREDIENTS_ERROR,
    });
    console.error("Failed to fetch data", e);
  }
};
