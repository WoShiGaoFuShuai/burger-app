import React from "react";
import cl from "./header-item.module.css";
import { HeaderItemProps } from "@/components/header/interfaces.header";

const HeaderItem: React.FC<HeaderItemProps> = ({
  icon: Icon,
  iconType,
  text,
  inactiveClass,
}) => {
  return (
    <li className={cl.header__item_link}>
      <Icon type={iconType} />
      <p className={`text text_type_main-default ${inactiveClass}`}>{text}</p>
    </li>
  );
};

export default HeaderItem;
