import { loadIngredients } from "../../../../src/services/ingredients/actions";
import ingredientsSlice, {
  addCounter,
  clearCounters,
  initialState,
  subtractCounter,
} from "../../../../src/services/ingredients/reducer";

describe("ingredientsSlice", () => {
  it("should return initial state", () => {
    expect(ingredientsSlice(undefined, {})).toEqual(initialState);
  });

  describe("addCounter", () => {
    it("does not change counter if can not find ingredient", () => {
      const mockInitialState = {
        ingredients: ["000", "111"],
      };

      const action = addCounter("222");
      const store = ingredientsSlice(mockInitialState, action);

      expect(store).toEqual({
        ...mockInitialState,
      });
    });

    it("adds 2 if it is a bun", () => {
      const mockInitialState = {
        previousBun: null,
        ingredients: [
          {
            _id: "000",
            type: "sauce",
            __v: 0,
          },
          {
            _id: "111",
            type: "bun",
            __v: 0,
          },
        ],
      };

      const action = addCounter("111");
      const store = ingredientsSlice(mockInitialState, action);

      expect(store).toEqual({
        ingredients: [
          {
            _id: "000",
            type: "sauce",
            __v: 0,
          },
          {
            _id: "111",
            type: "bun",
            __v: 2,
          },
        ],
        previousBun: {
          _id: "111",
          type: "bun",
          __v: 2,
        },
      });
    });

    it("adds 2 if it is a bun and reduces 2 from previous bun that was already there", () => {
      const mockInitialState = {
        previousBun: {
          _id: "111",
          type: "bun",
          __v: 2,
        },
        ingredients: [
          {
            _id: "000",
            type: "bun",
            __v: 0,
          },
          {
            _id: "111",
            type: "bun",
            __v: 2,
          },
        ],
      };

      const action = addCounter("000");
      const store = ingredientsSlice(mockInitialState, action);

      expect(store).toEqual({
        ingredients: [
          {
            _id: "000",
            type: "bun",
            __v: 2,
          },
          {
            _id: "111",
            type: "bun",
            __v: 0,
          },
        ],
        previousBun: {
          _id: "000",
          type: "bun",
          __v: 2,
        },
      });
    });

    it("adds 1 if it is not a bun", () => {
      const mockInitialState = {
        ingredients: [
          {
            _id: "000",
            type: "sauce",
            __v: 0,
          },
          {
            _id: "111",
            type: "sauce",
            __v: 0,
          },
        ],
      };

      const action = addCounter("000");
      const store = ingredientsSlice(mockInitialState, action);

      expect(store).toEqual({
        ingredients: [
          {
            _id: "000",
            type: "sauce",
            __v: 1,
          },
          {
            _id: "111",
            type: "sauce",
            __v: 0,
          },
        ],
      });
    });
  });

  describe("subtractCounter", () => {
    it("subtracts 1 from ingredients", () => {
      const mockInitialState = {
        ingredients: [
          {
            _id: "000",
            type: "sauce",
            __v: 2,
          },
          {
            _id: "111",
            type: "sauce",
            __v: 0,
          },
        ],
      };

      const action = subtractCounter("000");
      const store = ingredientsSlice(mockInitialState, action);

      expect(store).toEqual({
        ingredients: [
          {
            _id: "000",
            type: "sauce",
            __v: 1,
          },
          {
            _id: "111",
            type: "sauce",
            __v: 0,
          },
        ],
      });
    });
  });

  describe("clearCounters", () => {
    it("clears all counters in ingredients", () => {
      const mockInitialState = {
        defaultIngredients: [],
        ingredients: [
          {
            _id: "000",
            type: "sauce",
            __v: 2,
          },
          {
            _id: "111",
            type: "sauce",
            __v: 5,
          },
        ],
      };

      const action = clearCounters();
      const store = ingredientsSlice(mockInitialState, action);

      expect(store).toEqual({
        ...mockInitialState,
        ingredients: [],
      });
    });
  });

  describe("loadIngredients", () => {
    it("handles loadIngredients pending", () => {
      const action = { type: loadIngredients.pending.type };
      const store = ingredientsSlice(initialState, action);

      expect(store).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });

    it("handles loadIngredients fulfilled", () => {
      const action = {
        type: loadIngredients.fulfilled.type,
        payload: [
          { id: 0, type: "bun" },
          { id: 1, type: "sauce" },
        ],
      };
      const store = ingredientsSlice(initialState, action);

      expect(store).toEqual({
        ...initialState,
        ingredients: action.payload,
        defaultIngredients: action.payload,
        loading: false,
        error: null,
      });
    });

    it("handles loadIngredients rejected", () => {
      const action = {
        type: loadIngredients.rejected.type,
        error: { message: "Ошибка загрузки ингридиентов" },
      };
      const store = ingredientsSlice(initialState, action);

      expect(store).toEqual({
        ...initialState,
        loading: false,
        error: "Ошибка загрузки ингридиентов",
      });
    });
  });
});
