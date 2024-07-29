import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import cl from "@/components/header/app-header.module.css";
import HeaderItem from "@/components/header/header-item/header-item";

const AppHeader = () => {
  return (
    <header className={cl.header}>
      <nav className={cl.header__nav}>
        <ul className={cl.header__content}>
          <div className={cl.header__content_left}>
            <HeaderItem
              icon={BurgerIcon}
              iconType="primary"
              text="Конструктор"
            />
            <HeaderItem
              icon={ListIcon}
              iconType="secondary"
              text="Лента заказов"
              inactiveClass="text_color_inactive"
            />
          </div>

          <li className={cl.header__logo}>
            <Logo />
          </li>

          <HeaderItem
            icon={ProfileIcon}
            iconType="secondary"
            text="Личный кабинет"
            inactiveClass="text_color_inactive"
          />
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
