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

const URL: string = "https://norma.nomoreparties.space/api/";
const LOGIN: string = "auth/login";
const REGISTER: string = "auth/register";
const LOGOUT: string = "auth/logout";
const TOKEN: string = "auth/token";
const USER: string = "auth/user";
const FORGOT: string = "password-reset";
const RESET: string = "password-reset/reset";

export default class AuthService {
  static async registerRequest(formData: UserAuthInterface) {
    const response = await fetch(URL + REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Ответ сети был не ok.");

    const data: RegisterApiResponse = await response.json();
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

    if (!response.ok) {
      throw new Error("Ответ сети был не ok.");
    }

    const data: SuccessUserApiResponse = await response.json();
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

    if (!response.ok) throw new Error("Failed to update user info");

    const data: SuccessUserApiResponse = await response.json();
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

    if (!response.ok) throw new Error("Failed to update access token.");

    const data: RefreshTokenApiResponse = await response.json();

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

  static async forgotPasswordRequest(resetEmail: ForgotEmailInterface) {
    const response = await fetch(URL + FORGOT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetEmail),
    });

    if (!response.ok) throw new Error("Failed to reset password.");

    const data: ForgotResetPasswordApiResponse = await response.json();
    return data;
  }

  static async resetPasswordRequest(formData: ResetPasswordForm) {
    const response = await fetch(URL + RESET, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Failed to reset password.");

    const data: ForgotResetPasswordApiResponse = await response.json();
    return data;
  }

  static async logoutRequest(refreshToken: string) {
    const response = await fetch(URL + LOGOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (!response.ok) throw new Error("Failed to logout.");

    const data: LogoutApiResponse = await response.json();
    return data;
  }

  static async loginRequest(formData: UserAuthLogin) {
    const response = await fetch(URL + LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Failed to log in.");

    const data: RegisterApiResponse = await response.json();
    return data;
  }
}
