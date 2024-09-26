export const checkResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  const data: T = await res.json();
  return data;
};

export interface UserAuthNoPassword {
  name: string;
  email: string;
}

export interface UserAuthInterface extends UserAuthNoPassword {
  password: string;
}

export interface UpdateUserInfoRequestPayload {
  newInfo: UserAuthInterface;
  accessToken: string;
}

export interface UserAuthLogin {
  email: string;
  password: string;
}

export interface SuccessUserApiResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}

export interface RegisterApiResponse extends SuccessUserApiResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenApiResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface ForgotEmailInterface {
  email: string;
}

export interface ResetPasswordForm {
  password: string;
  token: string;
}

export interface ForgotResetPasswordApiResponse {
  success: boolean;
  message: string;
}

export interface LogoutApiResponse {
  success: boolean;
  message: string;
}
