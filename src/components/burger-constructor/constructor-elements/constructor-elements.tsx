import React, { useEffect, useState } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./constructor-elements.module.css";
import { IngredientsData } from "../../../types/interface.ingredients";
import EmptyBun from "../../burger-constructor/constructor-empty-element/constructor-empty-element";
import { useDrop } from "react-dnd";
import { useAppSelector, useAppDispatch } from "../../../services/hooks";
import { addConstructorItem } from "../../../services/burger-constructor/reducer";
import { burgerConstructorSelectors } from "../../../services/burger-constructor/reducer";
import { addCounter } from "../../../services/ingredients/reducer";
import ConstructorElementDraggable from "./constructor-element-draggable/constructor-element-draggable";

const ConstructorElements = () => {
  const burgerConstructorIngredients = useAppSelector(
    burgerConstructorSelectors.getAllBurgerConstructorState
  );

  const [draggedItemType, setDraggedItemType] = useState<string>("");

  const dispatch = useAppDispatch();

  const [{ isOver }, dropTarget] = useDrop({
    accept: "ingredient-item",
    drop(item: IngredientsData) {
      // add element to constructor item
      dispatch(addConstructorItem(item));

      //add counter
      dispatch(addCounter(item._id));
    },

    canDrop: (item) => {
      setDraggedItemType(item.type);
      return true;
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  useEffect(() => {
    if (!isOver) {
      setDraggedItemType("");
    }
  }, [isOver]);

  return (
    <ul ref={dropTarget} className={cl.items__wrapper}>
      {burgerConstructorIngredients.bun === null ? (
        <EmptyBun type="top" elementType={draggedItemType} />
      ) : (
        <li>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${burgerConstructorIngredients.bun.name} (верх)`}
            price={burgerConstructorIngredients.bun.price}
            thumbnail={burgerConstructorIngredients.bun.image_mobile}
          />
        </li>
      )}

      {!burgerConstructorIngredients.ingredients.length ? (
        <EmptyBun elementType={draggedItemType} type="middle" />
      ) : (
        <>
          {burgerConstructorIngredients.ingredients.map((item, index) => (
            <ConstructorElementDraggable
              key={item.key}
              burgerConstructorIngredient={item}
              index={index}
            />
          ))}
        </>
      )}

      {burgerConstructorIngredients.bun === null ? (
        <EmptyBun elementType={draggedItemType} type="bottom" />
      ) : (
        <li>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${burgerConstructorIngredients.bun.name} (низ)`}
            price={burgerConstructorIngredients.bun.price}
            thumbnail={burgerConstructorIngredients.bun.image_mobile}
          />
        </li>
      )}
    </ul>
  );
};

export default ConstructorElements;
