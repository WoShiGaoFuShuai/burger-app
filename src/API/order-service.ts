const ORDER_URL: string = "https://norma.nomoreparties.space/api/orders";

export interface OrderApiResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

export interface OrderData {
  ingredients: string[];
}

export default class OrderService {
  static async createOrder(orderData: any, accessToken: string) {
    const response = await fetch(ORDER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) throw new Error("Ответ сети был не ok.");

    const data: OrderApiResponse = await response.json();
    return data;
  }
}
