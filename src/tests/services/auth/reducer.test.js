import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserInfo,
} from "../../../services/auth/actions";
import authSlice, { initialState } from "../../../services/auth/reducer";
import {
  clearTokens,
  setAccessToken,
  setRefreshToken,
} from "../../../utils/local-storage";

jest.mock("../../../utils/local-storage", () => ({
  setAccessToken: jest.fn(),
  setRefreshToken: jest.fn(),
  clearTokens: jest.fn(),
}));

describe("authReducer", () => {
  it("should return initial state", () => {
    expect(authSlice(undefined, {})).toEqual(initialState);
  });

  describe("register user", () => {
    it("should handle registerUser pending", () => {
      const action = { type: registerUser.pending.type };
      const state = authSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null,
        loadingText: "Регистрируем нового пользователя",
      });
    });

    it("should handle registerUser fulfilled", () => {
      const actionPayload = {
        success: true,
        user: {
          email: "test@mail.com",
          name: "user-name",
        },
        accessToken: "testAccessToken",
        refreshToken: "testRefreshToken",
      };

      const action = {
        type: registerUser.fulfilled.type,
        payload: actionPayload,
      };
      const state = authSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: null,
        user: actionPayload.user,
        loadingText: "",
      });

      expect(setAccessToken).toHaveBeenCalledWith(action.payload.accessToken);
      expect(setRefreshToken).toHaveBeenCalledWith(action.payload.refreshToken);
    });

    it("should handle registerUser rejected", () => {
      const action = {
        type: registerUser.rejected.type,
        payload: "Ошибка регистрации",
      };

      const state = authSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: action.payload,
        loadingText: "",
      });
    });
  });

  describe("get user", () => {
    it("should handle getUser pending", () => {
      const action = { type: getUser.pending.type };
      const state = authSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null,
        loadingText: "Получаем данные",
      });
    });

    it("should handle getUser fulfilled", () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: { name: "test-name", email: "test-email" },
      };
      const state = authSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: null,
        loadingText: "",
        user: action.payload,
      });
    });

    it("should handle getUser rejected", () => {
      const action = {
        type: getUser.rejected.type,
        payload: "Ошибка при получении юзера",
      };
      const state = authSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: "Ошибка при получении юзера",
        loadingText: "",
        user: null,
      });
    });
  });

  describe("logout user", () => {
    it("should handle logout user pending", () => {
      const action = { type: logoutUser.pending.type };
      const state = authSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null,
        loadingText: "Выполяется выход из аккаута",
      });
    });

    it("should handle logout user fulfilled", () => {
      const action = {
        type: logoutUser.fulfilled.type,
      };
      const state = authSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: null,
        loadingText: "",
        user: null,
      });

      expect(clearTokens).toHaveBeenCalledTimes(1);
    });

    it("should handle logout user rejected", () => {
      const action = {
        type: logoutUser.rejected.type,
        payload: "Ошибка при выходе из аккаунта",
      };
      const state = authSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: "Ошибка при выходе из аккаунта",
        loadingText: "",
      });
    });
  });

  describe("login user", () => {
    it("should handle login user pending", () => {
      const action = { type: loginUser.pending.type };
      const state = authSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null,
        loadingText: "Выполяется вход в аккаунт",
      });
    });

    it("should handle login user fulfilled", () => {
      const actionPayload = {
        success: true,
        user: { email: "test-email-login", name: "test-name-login" },
        accessToken: "testLoginAccessToken",
        refreshToken: "testLoginrefreshToken",
      };
      const action = {
        type: loginUser.fulfilled.type,
        payload: actionPayload,
      };
      const state = authSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: null,
        loadingText: "",
        user: action.payload.user,
      });

      expect(setAccessToken).toHaveBeenCalledWith(action.payload.accessToken);
      expect(setRefreshToken).toHaveBeenCalledWith(action.payload.refreshToken);
    });

    it("should handle login user rejected", () => {
      const action = {
        type: loginUser.rejected.type,
        payload: "Ошибка при входе в аккаунт",
      };
      const state = authSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: "Ошибка при входе в аккаунт",
        loadingText: "",
      });
    });
  });

  describe("update user info", () => {
    it("should handle update user pending", () => {
      const action = { type: updateUserInfo.pending.type };
      const state = authSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null,
        loadingText: "Обновляем данные юзера",
      });
    });

    it("should handle update user fulfilled", () => {
      const action = {
        type: updateUserInfo.fulfilled.type,
        payload: {
          email: "test-updateUser-email",
          name: "test-updateUser-name",
        },
      };
      const state = authSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: null,
        loadingText: "",
        user: action.payload,
      });
    });

    it("should handle update user rejected", () => {
      const action = {
        type: updateUserInfo.rejected.type,
        payload: "Ошибка при обновлении данных",
      };
      const state = authSlice(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: "Ошибка при обновлении данных",
        loadingText: "",
      });
    });
  });
});
