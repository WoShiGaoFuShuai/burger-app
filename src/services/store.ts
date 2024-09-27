import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { socketMiddleware } from "./middleware/websocket-middleware";
import { MessageFeedOrders } from "@/types/interface.orders-feed";
import { wsConnect, wsDisconnect } from "./orders-feed-all/actions";
import {
  wsConnectProfile,
  wsDisconnectProfile,
} from "./orders-feed-profile/actions";
import { wsClose, wsError, wsMessage, wsOpen } from "./orders-feed-all/reducer";

const feedOrdersAllMiddleware = socketMiddleware<MessageFeedOrders>({
  connect: wsConnect,
  disconnect: wsDisconnect,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
});

const feedOrdersProfileMiddleware = socketMiddleware<MessageFeedOrders>({
  connect: wsConnectProfile,
  disconnect: wsDisconnectProfile,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      feedOrdersAllMiddleware,
      feedOrdersProfileMiddleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
