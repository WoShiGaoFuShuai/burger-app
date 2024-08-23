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
import { Link } from "react-router-dom";

const AppHeader = () => {
  const { user } = useAppSelector(authSelectors.getAuthState);

  let textCabinet = "Личный кабинет";

  if (user?.name) {
    textCabinet = user.name;
  }
  //

  return (
    <header className={cl.header}>
      <nav className={cl.header__nav}>
        <ul className={cl.header__content}>
          <div className={cl.header__content_left}>
            <HeaderItem icon={BurgerIcon} text="Конструктор" path="/" />
            <HeaderItem icon={ListIcon} text="Лента заказов" path="/no-path" />
          </div>

          <li className={cl.header__logo}>
            <Link to="/">
              <Logo />
            </Link>
          </li>
          <HeaderItem icon={ProfileIcon} text={textCabinet} path="/profile" />
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
