import { sendOrder } from "../../../services/create-order/actions";
import orderInfoSlice, {
  clearOrder,
  initialState,
} from "../../../services/create-order/reducer";

describe("create-order", () => {
  it("should return initial state", () => {
    expect(orderInfoSlice(undefined, {})).toEqual(initialState);
  });

  it("clears orders state", () => {
    const mockInitialState = { order: "some order" };
    const action = clearOrder();
    const state = orderInfoSlice(mockInitialState, action);

    expect(state).toEqual({
      order: null,
    });
  });

  it("handle sendOrder pending", () => {
    const action = { type: sendOrder.pending.type };
    const state = orderInfoSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it("handle sendOrder fulfilled", () => {
    const payloadAction = {
      name: "test-name",
      order: {
        number: 5,
      },
    };
    const action = { type: sendOrder.fulfilled.type, payload: payloadAction };
    const state = orderInfoSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: null,
      order: action.payload,
    });
  });

  it("handle sendOrder rejected", () => {
    const action = {
      type: sendOrder.rejected.type,
      payload: "Ошибка при отправке заказа",
    };
    const state = orderInfoSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: "Ошибка при отправке заказа",
    });
  });
});
