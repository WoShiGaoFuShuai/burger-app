import { configureStore as createReduxToolkitStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { socketMiddleware } from "./middleware/websocket-middleware";
import { wsOrdersAllActions } from "./orders-feed-all/actions";

export const configureStore = () => {
  return createReduxToolkitStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(socketMiddleware(wsOrdersAllActions)),
  });
};

export type AppDispatch = ReturnType<typeof configureStore>["dispatch"];
export type RootState = ReturnType<
  ReturnType<typeof configureStore>["getState"]
>;
