import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { socketMiddleware } from "./middleware/websocket-middleware";
import { wsOrdersAllActions } from "./orders-feed-all/actions";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(socketMiddleware(wsOrdersAllActions)),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
