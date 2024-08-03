import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./constructor-elements.module.css";
import { IngredientsData } from "@/types/interface.ingredients";

interface ConstructorElementsProps {
  ingredientsConstructor: {
    bun: IngredientsData;
    ingredients: IngredientsData[];
  };
}

const ConstructorElements: React.FC<ConstructorElementsProps> = ({
  ingredientsConstructor,
}) => {
  return (
    <ul className={cl.items__wrapper}>
      <li>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${ingredientsConstructor.bun.name} (верх)`}
          price={ingredientsConstructor.bun.price}
          thumbnail={ingredientsConstructor.bun.image_mobile}
        />
      </li>

      {ingredientsConstructor.ingredients.map((item) => (
        <li key={item._id}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={`${item.name}`}
            price={item.price}
            thumbnail={item.image_mobile}
          />
        </li>
      ))}

      <li>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${ingredientsConstructor.bun.name} (низ)`}
          price={ingredientsConstructor.bun.price}
          thumbnail={ingredientsConstructor.bun.image_mobile}
        />
      </li>
    </ul>
  );
};

export default ConstructorElements;
