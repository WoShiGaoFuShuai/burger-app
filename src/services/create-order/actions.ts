import OrderService from "@/API/order-service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrderData, OrderApiResponse } from "@/API/order-service";

export const sendOrder = createAsyncThunk<
  { name: string; order: { number: number } },
  OrderData,
  { rejectValue: string }
>(
  "create-order/sendOrder",
  async (orderData: OrderData, { rejectWithValue }) => {
    try {
      console.log("actions, try");
      const response: OrderApiResponse = await OrderService.createOrder(
        orderData
      );

      if (response.success) {
        console.log("actions, success");
        return {
          name: response.name,
          order: response.order,
        };
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        return rejectWithValue(error.message);
      }
      throw error;
    }
  }
);
