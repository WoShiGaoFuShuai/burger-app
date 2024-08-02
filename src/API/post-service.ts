import { IngredientsData } from "@/types/interface.ingredients";
const URL: string = "https://norma.nomoreparties.space/api/ingredients";

export interface ApiResponse {
  success: boolean;
  data: IngredientsData[];
}

export default class PostService {
  static async getAll() {
    const response = await fetch(URL);

    if (!response.ok) throw new Error("Ответ сети был не ok.");

    const data: ApiResponse = await response.json();
    return data;
  }
}
