import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendOrder } from "./actions";
import { RootState } from "../store";

export interface OrderSuccess {
  name: string;
  order: {
    number: number;
  };
}

interface OrdersInfoState {
  order: OrderSuccess | null;
  loading: boolean;
  error: null | string;
}

const initialState: OrdersInfoState = {
  order: null,
  loading: false,
  error: null,
};

const orderInfoSlice = createSlice({
  name: "create-order",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        sendOrder.fulfilled,
        (state, action: PayloadAction<OrderSuccess>) => {
          state.loading = false;
          state.error = null;
          state.order = action.payload;
        }
      )
      .addCase(sendOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Неизвестная ошибка";
      })
      .addCase(sendOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const orderInfoSelectors = {
  getOrdersInfoState: (state: RootState) => state.orderInfo,
  getOrder: (state: RootState) => state.orderInfo.order,
};

export const { clearOrder } = orderInfoSlice.actions;

export default orderInfoSlice.reducer;
