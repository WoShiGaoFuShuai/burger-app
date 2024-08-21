import React from "react";
import cl from "./header-item.module.css";
import { TIconTypes } from "@/components/header/types.header";
import { Link } from "react-router-dom";

interface HeaderItemProps {
  icon: React.ElementType<{ type: TIconTypes }>;
  iconType: TIconTypes;
  text: string;
  inactiveClass?: string;
  path: string;
}

const HeaderItem: React.FC<HeaderItemProps> = ({
  icon: Icon,
  iconType,
  text,
  inactiveClass,
  path,
}) => {
  return (
    <li>
      <Link to={path} className={cl.header__item_link}>
        <Icon type={iconType} />
        <p className={`text text_type_main-default ${inactiveClass}`}>{text}</p>
      </Link>
    </li>
  );
};

export default HeaderItem;
