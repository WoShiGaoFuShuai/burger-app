import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  RegisterApiResponse,
  UserAuthInterface,
  UserAuthLogin,
  SuccessUserApiResponse,
  UpdateUserInfoRequestPayload,
} from "@/utils/auth";
import AuthService from "@/API/auth-service";

export const registerUser = createAsyncThunk<
  RegisterApiResponse,
  UserAuthInterface,
  { rejectValue: string }
>("auth/register", async (formData: UserAuthInterface, { rejectWithValue }) => {
  try {
    const response = await AuthService.registerRequest(formData);

    if (!response.success) throw new Error("Failed to register user");

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
    throw error;
  }
});

export const getUser = createAsyncThunk<
  { email: string; name: string },
  string,
  { rejectValue: string }
>("auth/getUser", async (accessToken: string, { rejectWithValue }) => {
  try {
    const response = await AuthService.getUserRequest(accessToken);

    if (response?.success) {
      return {
        email: response.user.email,
        name: response.user.name,
      };
    } else {
      throw new Error("Failed to find user");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
    throw error;
  }
});

export const logoutUser = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("auth/logoutUser", async (refreshToken: string, { rejectWithValue }) => {
  try {
    await AuthService.logoutRequest(refreshToken);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
    throw error;
  }
});

export const loginUser = createAsyncThunk<
  RegisterApiResponse,
  UserAuthLogin,
  { rejectValue: string }
>("auth/loginUser", async (formData: UserAuthLogin, { rejectWithValue }) => {
  try {
    const response = await AuthService.loginRequest(formData);

    if (!response.success) throw Error("Failed to log in");

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error occurred");
  }
});

export const updateUserInfo = createAsyncThunk<
  { email: string; name: string },
  UpdateUserInfoRequestPayload,
  { rejectValue: string }
>(
  "auth/updateUserInfo",
  async ({ newInfo, accessToken }, { rejectWithValue }) => {
    try {
      const response = await AuthService.updateUserInfoRequest({
        newInfo,
        accessToken,
      });

      if (!response.success) throw Error("Failed to update user info");

      return response.user;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);
