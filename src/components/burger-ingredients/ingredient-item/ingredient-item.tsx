import React from "react";
import cl from "./ingredient-item.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsData } from "../../../types/interface.ingredients";
import { useDrag } from "react-dnd";
import { useLocation, useNavigate } from "react-router-dom";

interface IngredientItemProps {
  item: IngredientsData;
  index: number;
  ingredientItemClicked: (value: IngredientsData) => void;
}

const IngredientItem: React.FC<IngredientItemProps> = ({
  item,
  index,
  ingredientItemClicked,
}) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient-item",
    item: item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const border = isDrag ? "1px solid var(--accent)" : "";
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    ingredientItemClicked(item);
    navigate(`/ingredients/${item._id}`, { state: { bg: location } });
  };

  return (
    <li
      onClick={handleClick}
      className={cl.ingredient__item}
      ref={dragRef}
      style={{ border }}
      data-ingredient-item
    >
      {item.__v > 0 && (
        <Counter count={item.__v} size="default" extraClass="m-1" />
      )}
      <img src={item.image} alt={`${item.type} 0${index}`} />
      <div className={cl.ingredient__price}>
        <p className="text text_type_digits-default">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p data-ingredient-item-name className={cl.ingredient__name}>
        {item.name}
      </p>
    </li>
  );
};

export default IngredientItem;
