export interface FeedOrder {
  _id: string;
  name: string;
  ingredients: string[];
  number: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageFeedOrders {
  orders: FeedOrder[];
  success: boolean;
  total: number;
  totalToday: number;
}
