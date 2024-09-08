import { IngredientsData } from "@/types/interface.ingredients";
import { checkResponse } from "@/utils/auth";
const URL: string = "https://norma.nomoreparties.space/api/ingredients";

export interface ApiResponse {
  success: boolean;
  data: IngredientsData[];
}

export default class IngredientsService {
  static async getAll(): Promise<ApiResponse> {
    const response = await fetch(URL);

    const data: ApiResponse = await checkResponse<ApiResponse>(response);
    return data;
  }
}
