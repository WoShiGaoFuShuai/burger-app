const URL: string = "https://norma.nomoreparties.space/api/ingredients";

export default class PostService {
  static async getAll() {
    const response = await fetch(URL);

    if (!response.ok) throw new Error("Ответ сети был не ok.");

    const data = await response.json();
    return data;
  }
}
