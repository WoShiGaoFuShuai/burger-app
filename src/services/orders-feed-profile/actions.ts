import { createAction } from "@reduxjs/toolkit";

export const wsConnectProfile = createAction<
  string,
  "FEED_ORDERS_PROFILE_CONNECT"
>("FEED_ORDERS_PROFILE_CONNECT");
export const wsDisconnectProfile = createAction(
  "FEED_ORDERS_PROFILE_DISCONNECT"
);
export const URL_FEED_ORDERS_PROFILE = "wss://norma.nomoreparties.space/orders";
