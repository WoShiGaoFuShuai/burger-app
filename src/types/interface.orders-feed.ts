export interface OrderFeed {
  ingredients: Array<string>;
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersFeed {
  orders: Array<OrderFeed>;
  total: number;
  totalToday: number;
}
