import ordersFeedProfileSlice, {
  initialState,
  wsOpenProfile,
  WebsocketStatus,
  wsCloseProfile,
  wsErrorProfile,
  wsMessageProfile,
} from "../../../services/orders-feed-profile/reducer";

describe("orders-feed-profile", () => {
  it("should return initial state", () => {
    expect(ordersFeedProfileSlice(undefined, {})).toEqual(initialState);
  });

  it("handles wsOpenProfile", () => {
    const action = wsOpenProfile();
    const state = ordersFeedProfileSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
    });
  });

  it("handles wsCloseProfile", () => {
    const action = wsCloseProfile();
    const state = ordersFeedProfileSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  it("handles wsErrorProfile", () => {
    const action = {
      type: wsErrorProfile.type,
      payload: "Ошибка WS",
    };
    const state = ordersFeedProfileSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      connectionError: "Ошибка WS",
    });
  });

  it("handles wsMessageProfile", () => {
    const action = {
      type: wsMessageProfile.type,
      payload: {
        orders: [{ name: "order1" }, { name: "order2" }],
        success: true,
        total: 10,
        totalToday: 1,
      },
    };
    const state = ordersFeedProfileSlice(initialState, action);

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
