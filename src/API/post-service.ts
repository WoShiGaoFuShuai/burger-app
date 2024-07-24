const URL: string = "https://norma.nomoreparties.space/api/ingredients";

export default class PostService {
  static async getAll() {
    const response = await fetch(URL)
      .then((response) => response.json())
      .then((data) => data);

    return response;
  }
}
