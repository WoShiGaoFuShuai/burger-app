import { createAction } from "@reduxjs/toolkit";

export const wsConnect = createAction<string, "FEED_ORDERS_ALL_CONNECT">(
  "FEED_ORDERS_ALL_CONNECT"
);
export const wsDisconnect = createAction("FEED_ORDERS_ALL_DISCONNECT");
export const URL_FEED_ORDERS_ALL = "wss://norma.nomoreparties.space/orders/all";
