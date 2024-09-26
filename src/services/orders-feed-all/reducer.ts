import { OrdersFeed } from "@/types/interface.orders-feed";
import {
  ORDERS_ALL_SUCCESS,
  ORDERS_ALL_ERROR,
  ORDERS_ALL_CLOSED,
  ORDERS_ALL_MESSAGE,
  TOrdersAllActions,
} from "@/services/orders-feed-all/actions";

interface OrdersFeedAllState {
  connected: boolean;
  message: OrdersFeed | null;
  error: string | null;
}

export const initialState: OrdersFeedAllState = {
  connected: false,
  message: null,
  error: null,
};

export function ordersAllReducer(
  state = initialState,
  action: TOrdersAllActions
): OrdersFeedAllState {
  switch (action.type) {
    case ORDERS_ALL_SUCCESS:
      return { ...state, error: null, connected: true };
    case ORDERS_ALL_ERROR:
      return { ...state, error: action.error };
    case ORDERS_ALL_CLOSED:
      return { ...state, error: null, connected: false };
    case ORDERS_ALL_MESSAGE:
      return { ...state, error: null, message: action.message };
    default:
      return state;
  }
}
