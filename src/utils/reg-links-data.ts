export interface RegLinksInfo {
  text: string;
  textAccent: string;
  to: string;
}

export const loginLinks: RegLinksInfo[] = [
  {
    text: "Вы — новый пользователь?",
    textAccent: "Зарегистрироваться",
    to: "/register",
  },
  {
    text: "Забыли пароль?",
    textAccent: "Восстановить пароль",
    to: "/forgot-password",
  },
];

export const registrationLinks: RegLinksInfo[] = [
  { text: "Уже зарегистрированы?", textAccent: "Войти", to: "/login" },
];

export const forgotPasswordLinks: RegLinksInfo[] = [
  { text: "Вспомнили пароль?", textAccent: "Войти", to: "/login" },
];
