import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./constructor-elements.module.css";
import { IngredientsData } from "@/types/interface.ingredients";

interface ConstructorElementsProps {
  ingredientsData: IngredientsData[];
}

const ConstructorElements: React.FC<ConstructorElementsProps> = ({
  ingredientsData,
}) => {
  return (
    <ul className={cl.items__wrapper}>
      {ingredientsData.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === ingredientsData.length - 1;

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
