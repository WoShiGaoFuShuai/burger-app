import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "@/components/header/app-header.module.css";
import HeaderItem from "@/components/header/header-item/header-item";
import { useAppSelector } from "@/services/hooks";
import { authSelectors } from "@/services/auth/reducer";

const AppHeader = () => {
  const { user } = useAppSelector(authSelectors.getAuthState);

  let textCabinet = "Личный кабинет";

  if (user?.name) {
    textCabinet = user.name;
  }

  return (
    <header className={cl.header}>
      <nav className={cl.header__nav}>
        <ul className={cl.header__content}>
          <div className={cl.header__content_left}>
            <HeaderItem
              icon={BurgerIcon}
              iconType="primary"
              text="Конструктор"
              path="/"
            />
            <HeaderItem
              icon={ListIcon}
              iconType="secondary"
              text="Лента заказов"
              inactiveClass="text_color_inactive"
              path="/"
            />
          </div>

          <li className={cl.header__logo}>
            <Logo />
          </li>
          <HeaderItem
            icon={ProfileIcon}
            iconType="secondary"
            text={textCabinet}
            inactiveClass="text_color_inactive"
            path="/profile"
          />
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
