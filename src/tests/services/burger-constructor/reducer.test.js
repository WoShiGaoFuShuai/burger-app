import burgerConstructorSlice, {
  addConstructorItem,
  clearState,
  initialState,
  moveConstructorIngredient,
  removeConstructorItem,
} from "../../../services/burger-constructor/reducer";

describe("burger-constructor", () => {
  it("should return initial state", () => {
    expect(burgerConstructorSlice(undefined, {})).toEqual(initialState);
  });

  it("handles removeConstructorItem", () => {
    const mockInitialState = {
      ...initialState,
      ingredients: [
        { key: "111", name: "111" },
        { key: "222", name: "222" },
        { key: "333", name: "333" },
      ],
    };
    const action = removeConstructorItem("222");
    const state = burgerConstructorSlice(mockInitialState, action);

    expect(state).toEqual({
      bun: null,
      ingredients: [
        { key: "111", name: "111" },
        { key: "333", name: "333" },
      ],
    });
  });

  it("handles moveConstructorIngredient", () => {
    const mockInitialState = {
      ...initialState,
      ingredients: [
        { key: "111", name: "111" },
        { key: "222", name: "222" },
        { key: "333", name: "333" },
      ],
    };

    const actionPayload = { dragIndex: 2, hoverIndex: 1 };

    const action = moveConstructorIngredient(actionPayload);
    const state = burgerConstructorSlice(mockInitialState, action);

    expect(state).toEqual({
      bun: null,
      ingredients: [
        { key: "111", name: "111" },
        { key: "333", name: "333" },
        { key: "222", name: "222" },
      ],
    });
  });

  it("handles clearState", () => {
    const mockInitialState = {
      bun: "000",
      ingredients: [
        { key: "111", name: "111" },
        { key: "222", name: "222" },
        { key: "333", name: "333" },
      ],
    };

    const action = clearState();
    const state = burgerConstructorSlice(mockInitialState, action);

    expect(state).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  describe("handles addConstructorItem", () => {
    it("adds item to the bun if it is a bun", () => {
      const item = { name: "000", type: "bun" };
      const action = addConstructorItem(item);

      const store = burgerConstructorSlice(initialState, action);

      expect(store).toEqual({
        ...initialState,
        bun: {
          ...item,
          key: expect.any(String),
        },
      });
    });

    it("adds item to the ingredients if it is not a bun", () => {
      const item = { name: "000", type: "sauce" };
      const action = addConstructorItem(item);

      const store = burgerConstructorSlice(initialState, action);

      expect(store).toEqual({
        ...initialState,
        bun: null,
        ingredients: [{ ...item, key: expect.any(String) }],
      });
    });
  });
});
