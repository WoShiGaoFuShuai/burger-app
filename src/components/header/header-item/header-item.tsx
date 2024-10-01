import React from "react";
import cl from "./header-item.module.css";
import { TIconTypes } from "@/components/header/types.header";
import { NavLink } from "react-router-dom";

interface HeaderItemProps {
  icon: React.ElementType<{ type: TIconTypes }>;
  text: string;
  path: string;
}

const HeaderItem: React.FC<HeaderItemProps> = ({ icon: Icon, text, path }) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `${cl.header__item_link} ${isActive ? cl.active : ""}`
        }
      >
        {({ isActive }) => (
          <>
            <Icon type={isActive ? "primary" : "secondary"} />
            <p
              className={`text text_type_main-default ${
                isActive ? "" : "text_color_inactive"
              }`}
            >
              {text}
            </p>
          </>
        )}
      </NavLink>
    </li>
  );
};

export default HeaderItem;
