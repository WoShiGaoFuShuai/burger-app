import {AnyAction, Dispatch, Middleware} from "redux";
import { RootState } from "@/services/store";

type TWSActionsType = {
  onStart: string,
  onOpen: string,
  onSuccess: string,
  onClosed: string,
  onDisconnect: string,
  onError: string,
  onMessage: string,
}

export const socketMiddleware = (wsActions: TWSActionsType): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let url = "";

    return (next) => (action) => {
      socket = new WebSocket(url);

      socket.onopen = () => {
        console.log("WebSocket connected");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Message from server:", data);
      };

      socket.onclose = () => {
        console.log("WebSocket disconnected");
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      return next(action);
    };
  };
};
