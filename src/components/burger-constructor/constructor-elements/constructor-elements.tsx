import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./constructor-elements.module.css";
import { IngredientsData } from "@/types/interface.ingredients";
import EmptyBun from "@/components/burger-constructor/constructor-empty-element/constructor-empty-element";

interface ConstructorElementsProps {
  ingredientsConstructor: {
    bun: IngredientsData | null;
    ingredients: IngredientsData[];
  };
}

const ConstructorElements: React.FC<ConstructorElementsProps> = ({
  ingredientsConstructor,
}) => {
  return (
    <ul className={cl.items__wrapper}>
      {ingredientsConstructor.bun === null ? (
        <EmptyBun type="top" />
      ) : (
        <li>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${ingredientsConstructor.bun.name} (верх)`}
            price={ingredientsConstructor.bun.price}
            thumbnail={ingredientsConstructor.bun.image_mobile}
          />
        </li>
      )}

      {!ingredientsConstructor.ingredients.length ? (
        <EmptyBun type="middle" />
      ) : (
        <>
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
        </>
      )}

      {ingredientsConstructor.bun === null ? (
        <EmptyBun type="bottom" />
      ) : (
        <li>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${ingredientsConstructor.bun.name} (низ)`}
            price={ingredientsConstructor.bun.price}
            thumbnail={ingredientsConstructor.bun.image_mobile}
          />
        </li>
      )}
    </ul>
  );
};

export default ConstructorElements;
