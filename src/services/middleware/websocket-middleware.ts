import type { AnyAction, Middleware, MiddlewareAPI } from "redux";
import { wsActionsTypes } from "../orders-feed-all/actions";

export const socketMiddleware = (wsActions: wsActionsTypes): Middleware => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    let url = "";

    return (next) => (action: AnyAction) => {
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
    };
  };
};
