import { checkResponse } from "@/utils/auth";
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
  static async createOrder(
    orderData: OrderData,
    accessToken: string
  ): Promise<OrderApiResponse> {
    console.log("AT", accessToken);
    const response = await fetch(ORDER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderData),
    });

    const data: OrderApiResponse = await checkResponse<OrderApiResponse>(
      response
    );
    console.log("DATA", data);
    return data;
  }
}
