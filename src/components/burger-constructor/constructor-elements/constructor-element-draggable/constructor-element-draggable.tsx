import React, { useRef } from "react";
import type { XYCoord } from "dnd-core";
import cl from "./constructor-element-draggable.module.css";

import { IngredientsDataWithKey } from "@/types/interface.ingredients";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  removeConstructorItem,
  moveConstructorIngredient,
} from "@/services/burger-constructor/reducer";
import { subtractCounter } from "@/services/ingredients/reducer";

interface ConstructorElementDraggableProps {
  burgerConstructorIngredient: IngredientsDataWithKey;
  index: number;
}

const ConstructorElementDraggable: React.FC<
  ConstructorElementDraggableProps
> = ({ burgerConstructorIngredient, index }) => {
  const ref = useRef<HTMLLIElement>(null);
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: "constructor-element",
    hover: (item: { key: string; index: number }, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(moveConstructorIngredient({ dragIndex, hoverIndex }));

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructor-element",
    item: { key: burgerConstructorIngredient.key, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = !isDragging ? 1 : 0;
  drag(drop(ref));

  const handleRemoveItem = (item: IngredientsDataWithKey) => {
    dispatch(removeConstructorItem(item.key));
    dispatch(subtractCounter(item._id));
  };

  return (
    <li
      className={cl.draggable__item}
      style={{ opacity }}
      key={burgerConstructorIngredient.key}
      ref={ref}
      draggable
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={`${burgerConstructorIngredient.name}`}
        price={burgerConstructorIngredient.price}
        thumbnail={burgerConstructorIngredient.image_mobile}
        handleClose={() => handleRemoveItem(burgerConstructorIngredient)}
      />
    </li>
  );
};

export default ConstructorElementDraggable;
