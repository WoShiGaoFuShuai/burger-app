import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  RegisterApiResponse,
  UserAuthInterface,
  UserAuthLogin,
  UpdateUserInfoRequestPayload,
} from "@/utils/auth";
import AuthService from "@/API/auth-service";

export const registerUser = createAsyncThunk<
  RegisterApiResponse,
  UserAuthInterface,
  { rejectValue: string }
>("auth/register", async (formData: UserAuthInterface, { rejectWithValue }) => {
  const response = await AuthService.registerRequest(formData);

  if (!response.success) return rejectWithValue("Failed to register user");

  return response;
});

export const getUser = createAsyncThunk<
  { email: string; name: string },
  string,
  { rejectValue: string }
>("auth/getUser", async (accessToken: string, { rejectWithValue }) => {
  const response = await AuthService.getUserRequest(accessToken);

  if (!response?.success) return rejectWithValue("Failed to find user");

  return {
    email: response.user.email,
    name: response.user.name,
  };
});

export const logoutUser = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("auth/logoutUser", async (refreshToken: string, { rejectWithValue }) => {
  const response = await AuthService.logoutRequest(refreshToken);

  if (!response.success) return rejectWithValue("Failed to log out");
});

export const loginUser = createAsyncThunk<
  RegisterApiResponse,
  UserAuthLogin,
  { rejectValue: string }
>("auth/loginUser", async (formData: UserAuthLogin, { rejectWithValue }) => {
  const response = await AuthService.loginRequest(formData);
  if (!response.success) return rejectWithValue("Failed to log in");
  return response;
});

export const updateUserInfo = createAsyncThunk<
  { email: string; name: string },
  UpdateUserInfoRequestPayload,
  { rejectValue: string }
>(
  "auth/updateUserInfo",
  async ({ newInfo, accessToken }, { rejectWithValue }) => {
    const response = await AuthService.updateUserInfoRequest({
      newInfo,
      accessToken,
    });

    if (!response.success) return rejectWithValue("Failed to update user info");

    return response.user;
  }
);
