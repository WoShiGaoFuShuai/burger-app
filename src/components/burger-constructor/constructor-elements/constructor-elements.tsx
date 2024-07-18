import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElementsProps } from "@/components/burger-constructor/interfaces.burger-constructor";
import cl from "./constructor-elements.module.css";

const ConstructorElements: React.FC<ConstructorElementsProps> = ({
  dataConstructor,
}) => {
  return (
    <ul className={cl.items__wrapper}>
      {dataConstructor.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === dataConstructor.length - 1;

        return (
          <li key={item._id} className={cl.item}>
            {!isFirst && !isLast && <DragIcon type="primary" />}
            <ConstructorElement
              type={isFirst ? "top" : isLast ? "bottom" : undefined}
              isLocked={isFirst || isLast}
              text={`${item.name}`}
              price={item.price}
              thumbnail={item.image_mobile}
              extraClass="gg"
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ConstructorElements;
