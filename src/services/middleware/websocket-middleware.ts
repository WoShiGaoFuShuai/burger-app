import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import AuthService from "@/API/auth-service";

export type TWsActionTypes<R> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <R>(
  wsActions: TWsActionTypes<R>,
  withTokenRefresh: boolean = false
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const { connect, disconnect, onOpen, onClose, onError, onMessage } =
      wsActions;

    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";

    return (next) => (action) => {
      const { dispatch } = store;

      if (connect.match(action)) {
        socket = new WebSocket(action.payload);
        url = action.payload;
        console.log(url);

        isConnected = true;

        socket.onopen = () => {
          console.log("WebSocket connection established");
          dispatch(onOpen());
        };

        socket.onerror = () => {
          console.log("WebSocket ERROR");
          dispatch(onError("Error"));
        };

        socket.onclose = () => {
          dispatch(onClose());
          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_PERIOD);
          }
        };

        socket.onmessage = (e) => {
          const { data } = e;
          try {
            const parsedData = JSON.parse(data);
            console.log("paresr", parsedData);

            if (
              withTokenRefresh &&
              parsedData.message === "Invalid or missing token"
            ) {
              console.log("???");
              AuthService.updateAccessToken()
                .then((newAccessToken) => {
                  const wssUrl = new URL(url);
                  wssUrl.searchParams.set("token", newAccessToken || "");
                  dispatch(connect(wssUrl.toString()));
                })
                .catch((err) => {
                  dispatch(onError((err as Error).message));
                });

              dispatch(disconnect());

              return;
            }
            console.log("Dispatching onMessage:", onMessage); // Добавь
            dispatch(onMessage(parsedData));
          } catch (err) {
            dispatch(onError((err as Error).message));
          }
        };
      }

      if (socket && disconnect.match(action)) {
        clearTimeout(reconnectTimer);
        reconnectTimer = 0;
        isConnected = false;
        socket.close();
        socket = null;
      }

      next(action);
    };
  };
};