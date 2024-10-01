export const setLsItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const getLsItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const removeLsItem = (key: string): void => {
  localStorage.removeItem(key);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

export const setRefreshToken = (value: string): void => {
  localStorage.setItem("refreshToken", value);
};

export const setAccessToken = (value: string): void => {
  const splitValue = value.split("Bearer ")[1];
  localStorage.setItem("accessToken", splitValue);
};

export const clearTokens = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
