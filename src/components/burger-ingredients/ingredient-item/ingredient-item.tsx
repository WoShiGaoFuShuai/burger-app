import React from "react";
import cl from "./ingredient-item.module.css";
import { IngredientItemProps } from "@/components/burger-ingredients/interfaces.burger-ingredients";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientItem: React.FC<IngredientItemProps> = ({ array }) => {
  return (
    <>
      {array.map((item, index) => {
        return (
          <li className={cl.ingredient__item} key={item._id}>
            {item.__v > 0 && (
              <Counter count={item.__v} size="default" extraClass="m-1" />
            )}
            <img src={item.image} alt={`${item.type} 0${index}`} />
            <div className={cl.ingredient__price}>
              <p className="text text_type_digits-default">{item.price}</p>
              <CurrencyIcon type="primary" />
            </div>
            <p className={cl.ingredient__name}>{item.name}</p>
          </li>
        );
      })}
    </>
  );
};

export default IngredientItem;
