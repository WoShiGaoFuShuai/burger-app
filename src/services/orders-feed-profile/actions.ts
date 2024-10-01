import { MessageFeedOrders } from "@/types/interface.orders-feed";
import { createAction } from "@reduxjs/toolkit";

export const URL_FEED_ORDERS_PROFILE = "wss://norma.nomoreparties.space/orders";

export const wsConnectProfile = createAction<
  string,
  "FEED_ORDERS_PROFILE_CONNECT"
>("FEED_ORDERS_PROFILE_CONNECT");
export const wsDisconnectProfile = createAction(
  "FEED_ORDERS_PROFILE_DISCONNECT"
);
export const wsOpenProfile = createAction("FEED_ORDERS_PROFILE_OPEN");
export const wsCloseProfile = createAction("FEED_ORDERS_PROFILE_CLOSE");
export const wsErrorProfile = createAction<string>("FEED_ORDERS_PROFILE_ERROR");
export const wsMessageProfile = createAction<MessageFeedOrders>(
  "FEED_ORDERS_PROFILE_MESSAGE"
);
