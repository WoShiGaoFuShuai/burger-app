import React, { forwardRef } from "react";

import cl from "./ingredients-group.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import { IngredientsData } from "@/types/interface.ingredients";
import { addItemShowInModal } from "@/services/item-show-in-modal/reducer";
import { useAppDispatch } from "@/services/hooks";
import { setSsItem } from "@/utils/session-storage";

interface IngredientsGroupProps {
  array: IngredientsData[];
  title: string;
}

const IngredientsGroup = forwardRef<HTMLDivElement, IngredientsGroupProps>(
  ({ array, title }, ref) => {
    const dispatch = useAppDispatch();

    const ingredientItemClicked = (item: IngredientsData) => {
      dispatch(addItemShowInModal(item));
      setSsItem("itemInModal", JSON.stringify(item));
    };

    return (
      <div ref={ref} className="mb-10">
        <p className={`${cl.title} mb-6`}>{title}</p>

        <ul className={cl.ingredients__items_wrapper}>
          {array.map((item, index) => (
            <IngredientItem
              item={item}
              index={index}
              ingredientItemClicked={ingredientItemClicked}
              key={item._id}
            />
          ))}
        </ul>
      </div>
    );
  }
);

export default IngredientsGroup;
