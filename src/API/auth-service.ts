import {
  UserAuthInterface,
  RegisterApiResponse,
  SuccessUserApiResponse,
  RefreshTokenApiResponse,
  ForgotEmailInterface,
  ResetPasswordForm,
  ForgotResetPasswordApiResponse,
  LogoutApiResponse,
  UserAuthLogin,
  UpdateUserInfoRequestPayload,
} from "@/utils/auth";
import {
  getAccessToken,
  getRefreshToken,
  setRefreshToken,
  setAccessToken,
} from "@/utils/local-storage";
import { checkResponse } from "@/utils/auth";

const URL: string = "https://norma.nomoreparties.space/api/";
const LOGIN: string = "auth/login";
const REGISTER: string = "auth/register";
const LOGOUT: string = "auth/logout";
const TOKEN: string = "auth/token";
const USER: string = "auth/user";
const FORGOT: string = "password-reset";
const RESET: string = "password-reset/reset";

export default class AuthService {
  static async registerRequest(
    formData: UserAuthInterface
  ): Promise<RegisterApiResponse> {
    const response = await fetch(URL + REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data: RegisterApiResponse = await checkResponse<RegisterApiResponse>(
      response
    );

    return data;
  }

  static async getUserRequest(
    accessToken: string
  ): Promise<SuccessUserApiResponse | void> {
    const response = await fetch(URL + USER, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok && response.status === 403) {
      const newAccessToken = await this.updateAccessToken();
      if (newAccessToken) {
        return this.getUserRequest(newAccessToken);
      }
      return;
    }

    const data: SuccessUserApiResponse =
      await checkResponse<SuccessUserApiResponse>(response);
    return data;
  }

  static async updateUserInfoRequest({
    newInfo,
    accessToken,
  }: UpdateUserInfoRequestPayload) {
    const response = await fetch(URL + USER, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newInfo),
    });

    const data: SuccessUserApiResponse =
      await checkResponse<SuccessUserApiResponse>(response);
    return data;
  }

  static async updateAccessToken(): Promise<string | void> {
    const refreshToken = {
      token: getRefreshToken(),
    };

    if (!refreshToken.token) throw new Error("Enable to find refreshToken");

    // SEND NEW REQUEST FOR UPDATING ACCESS TOKEN
    const response = await fetch(URL + TOKEN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(refreshToken),
    });

    const data: RefreshTokenApiResponse =
      await checkResponse<RefreshTokenApiResponse>(response);

    if (!data.success) throw new Error("Token update was unsuccessful.");

    //SET local storage with new data
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);

    const newAccessToken = getAccessToken();

    if (!newAccessToken) {
      throw new Error("Updating your access token was unsuccessful.");
    }

    return newAccessToken;
  }

  static async forgotPasswordRequest(
    resetEmail: ForgotEmailInterface
  ): Promise<ForgotResetPasswordApiResponse> {
    const response = await fetch(URL + FORGOT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetEmail),
    });

    const data: ForgotResetPasswordApiResponse =
      await checkResponse<ForgotResetPasswordApiResponse>(response);
    return data;
  }

  static async resetPasswordRequest(
    formData: ResetPasswordForm
  ): Promise<ForgotResetPasswordApiResponse> {
    const response = await fetch(URL + RESET, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data: ForgotResetPasswordApiResponse =
      await checkResponse<ForgotResetPasswordApiResponse>(response);
    return data;
  }

  static async logoutRequest(refreshToken: string): Promise<LogoutApiResponse> {
    const response = await fetch(URL + LOGOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    const data: LogoutApiResponse = await checkResponse<LogoutApiResponse>(
      response
    );
    return data;
  }

  static async loginRequest(
    formData: UserAuthLogin
  ): Promise<RegisterApiResponse> {
    const response = await fetch(URL + LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data: RegisterApiResponse = await checkResponse<RegisterApiResponse>(
      response
    );
    return data;
  }
}
