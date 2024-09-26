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
  orders: OrderFeed[];
  total: number;
  totalToday: number;
}
