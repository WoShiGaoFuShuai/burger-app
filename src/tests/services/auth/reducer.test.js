import authSlice, { initialState } from "../../../services/auth/reducer";

describe("authReducer initial state", () => {
  it("should return initial state", () => {
    expect(authSlice(undefined, {})).toEqual(initialState);
  });
});
