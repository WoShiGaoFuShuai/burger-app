import ordersFeedAllSlice, {
  initialState,
  wsOpen,
  WebsocketStatus,
  wsClose,
  wsError,
  wsMessage,
} from "../../../services/orders-feed-all/reducer";

describe("orders-feed-all", () => {
  it("should return initial state", () => {
    expect(ordersFeedAllSlice(undefined, {})).toEqual(initialState);
  });

  it("handles wsOpen", () => {
    const action = wsOpen();
    const state = ordersFeedAllSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
    });
  });

  it("handles wsClose", () => {
    const action = wsClose();
    const state = ordersFeedAllSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  it("handles wsError", () => {
    const action = {
      type: wsError.type,
      payload: "Ошибка WS",
    };
    const state = ordersFeedAllSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      connectionError: "Ошибка WS",
    });
  });

  it("handles wsMessage", () => {
    const action = {
      type: wsMessage.type,
      payload: {
        orders: [{ name: "order1" }, { name: "order2" }],
        success: true,
        total: 10,
        totalToday: 1,
      },
    };
    const state = ordersFeedAllSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      success: action.payload.success,
      orders: action.payload.orders,
      total: action.payload.total,
      totalToday: action.payload.totalToday,
      connectionError: null,
    });
  });
});
