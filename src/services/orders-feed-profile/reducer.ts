import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { MessageFeedOrders } from "@/types/interface.orders-feed";

export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}
interface FeedProfileState extends MessageFeedOrders {
  status: string;
  connectionError: string | null;
}

const initialState: FeedProfileState = {
  status: "",
  orders: [],
  success: false,
  total: 0,
  totalToday: 0,
  connectionError: null,
};

const ordersFeedProfileSlice = createSlice({
  name: "feedProfile",
  initialState,
  reducers: {
    wsOpenProfile: (state) => {
      state.status = WebsocketStatus.ONLINE;
    },
    wsCloseProfile: (state) => {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsErrorProfile: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsMessageProfile: (state, action: PayloadAction<MessageFeedOrders>) => {
      console.log("IN REDUCER", action);
      state.success = action.payload.success;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.connectionError = null;
    },
  },
});

export const {
  wsOpenProfile,
  wsCloseProfile,
  wsErrorProfile,
  wsMessageProfile,
} = ordersFeedProfileSlice.actions;

export const ordersFeedProfileSelectors = {
  getOrdersFeedProfileState: (state: RootState) => state.ordersFeedProfile,
  getWebsocketProfileStatus: (state: RootState) =>
    state.ordersFeedProfile.status,
};

export default ordersFeedProfileSlice.reducer;
