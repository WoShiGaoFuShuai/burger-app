import itemShowInModalSlice, {
  addItemShowInModal,
  clearItemShowInModal,
  initialState,
} from "../../../services/item-show-in-modal/reducer";

describe("item-show-in-modal", () => {
  it("should return initial state", () => {
    expect(itemShowInModalSlice(undefined, {})).toEqual(initialState);
  });

  it("adds item to the store", () => {
    const actionPayload = { id: 0, name: "test-name" };
    const action = addItemShowInModal(actionPayload);
    const state = itemShowInModalSlice(initialState, action);

    expect(state).toEqual({
      itemShowInModal: actionPayload,
    });
  });

  it("clears store", () => {
    const action = clearItemShowInModal();
    const state = itemShowInModalSlice(initialState, action);

    expect(state).toEqual({
      itemShowInModal: null,
    });
  });
});
