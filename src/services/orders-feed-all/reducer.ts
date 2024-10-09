import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { MessageFeedOrders } from "../../types/interface.orders-feed";

export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

interface FeedState extends MessageFeedOrders {
  status: string;
  connectionError: string | null;
}

export const initialState: FeedState = {
  status: "",
  orders: [],
  success: false,
  total: 0,
  totalToday: 0,
  connectionError: null,
};

const ordersFeedAllSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    wsOpen: (state) => {
      state.status = WebsocketStatus.ONLINE;
    },
    wsClose: (state) => {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsMessage: (state, action: PayloadAction<MessageFeedOrders>) => {
      state.success = action.payload.success;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.connectionError = null;
    },
  },
});

export const { wsOpen, wsClose, wsError, wsMessage } =
  ordersFeedAllSlice.actions;
export const ordersFeedAllSelectors = {
  getOrdersFeedState: (state: RootState) => state.ordersFeedAll,
  getWebsocketStatus: (state: RootState) => state.ordersFeedAll.status,
};

export default ordersFeedAllSlice.reducer;
