export const setSsItem = (key: string, value: string): void => {
  sessionStorage.setItem(key, value);
};

export const getSsItem = (key: string): string | null => {
  return sessionStorage.getItem(key);
};

export const removeSsItem = (key: string): void => {
  sessionStorage.removeItem(key);
};
