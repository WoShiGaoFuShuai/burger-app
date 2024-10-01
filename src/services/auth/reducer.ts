import { RegisterApiResponse, UserAuthNoPassword } from "../../utils/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  registerUser,
  getUser,
  logoutUser,
  loginUser,
  updateUserInfo,
} from "../auth/actions";
import { RootState } from "../store";
import {
  clearTokens,
  setAccessToken,
  setRefreshToken,
} from "../../utils/local-storage";

interface AuthState {
  user: UserAuthNoPassword | null;
  loading: boolean;
  error: null | string;
  loadingText: string;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  loadingText: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //REGISTER USER
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<RegisterApiResponse>) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload.user;
          state.loadingText = "";

          setAccessToken(action.payload.accessToken);
          setRefreshToken(action.payload.refreshToken);
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Неизвестная ошибка";
        state.loadingText = "";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.loadingText = "Регистрируем нового пользователя";
      })
      //GET USER
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<UserAuthNoPassword>) => {
          state.user = { ...action.payload };
          state.loading = false;
          state.error = null;
          state.loadingText = "";
        }
      )
      .addCase(getUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.payload || "Неизвестная ошибка";
        state.loadingText = "";
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.loadingText = "Получаем данные";
      })

      //LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
        state.user = null;
        state.loadingText = "";

        clearTokens();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload || "Неизвестная ошибка";
        state.loading = false;
        state.loadingText = "";
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.loadingText = "Выполяется выход из аккаута";
      })
      //LOGIN
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<RegisterApiResponse>) => {
          state.error = null;
          state.loading = false;
          state.user = action.payload.user;
          state.loadingText = "";

          // set tokens in LS
          setAccessToken(action.payload.accessToken);
          setRefreshToken(action.payload.refreshToken);
        }
      )
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Неизвестная ошибка";
          state.loading = false;
          state.loadingText = "";
        }
      )
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.loadingText = "Выполяется вход в аккаунт";
      })
      //UPDATE USER INFO
      .addCase(
        updateUserInfo.fulfilled,
        (state, action: PayloadAction<UserAuthNoPassword>) => {
          state.error = null;
          state.loading = false;
          state.user = { ...action.payload };
          state.loadingText = "";
        }
      )
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.error = action.payload || "Неизвестная ошибка";
        state.loading = false;
        state.loadingText = "";
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.loadingText = "Обновляем данные юзера";
      });
  },
});

export const authSelectors = {
  getAuthState: (state: RootState) => state.auth,
};

export default authSlice.reducer;
