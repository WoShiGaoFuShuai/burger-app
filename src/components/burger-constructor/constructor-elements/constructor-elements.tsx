import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import cl from "./constructor-elements.module.css";
import { IngredientsData } from "@/types/interface.ingredients";
import EmptyBun from "@/components/burger-constructor/constructor-empty-element/constructor-empty-element";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addConstructorItem } from "@/services/burger-constructor/reducer";
import { burgerConstructorSelectors } from "@/services/burger-constructor/reducer";
import { addCounter } from "@/services/ingredients/reducer";
import ConstructorElementDraggable from "./constructor-element-draggable/constructor-element-draggable";

const ConstructorElements = () => {
  const burgerConstructorIngredients = useSelector(
    burgerConstructorSelectors.getAllBurgerConstructorState
  );

  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: "ingredient-item",
    drop(item: IngredientsData) {
      // add element to constructor item
      dispatch(addConstructorItem(item));

      //add counter
      dispatch(addCounter(item._id));
    },
  });

  return (
    <ul ref={dropTarget} className={cl.items__wrapper}>
      {burgerConstructorIngredients.bun === null ? (
        <EmptyBun type="top" />
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
        <EmptyBun type="middle" />
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

        //   <ConstructorElementDraggable
        //   burgerConstructorIngredientsOnly={
        //     burgerConstructorIngredients.ingredients
        //   }
        // />
        /* {burgerConstructorIngredients.ingredients.map((item) => (
            <li key={item.key} ref={drag} draggable>
              <DragIcon type="primary" />
              <ConstructorElement
                text={`${item.name}`}
                price={item.price}
                thumbnail={item.image_mobile}
                handleClose={() => handleRemoveItem(item)}
              />
            </li>
          ))} */
      )}

      {burgerConstructorIngredients.bun === null ? (
        <EmptyBun type="bottom" />
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
