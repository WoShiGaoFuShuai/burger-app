import React, { useState } from "react";

import cl from "./ingredients-group.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import IngredientDetails from "@/components/modal/ingredient-details/ingredient-details";
import Modal from "@/components/modal/modal";
import { IngredientsData } from "@/types/interface.ingredients";

interface IngredientsGroupProps {
  array: IngredientsData[];
  title: string;
}

const IngredientsGroup: React.FC<IngredientsGroupProps> = ({
  array,
  title,
}) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [itemToShowInModal, setItemToShowInModal] =
    useState<IngredientsData | null>(null);

  const ingredientItemClicked = (item: IngredientsData) => {
    setItemToShowInModal(item);
    setIsShowModal(true);
  };

  return (
    <div className="mb-10">
      <p className={`${cl.title} mb-6`}>{title}</p>

      <ul className={cl.ingredients__items_wrapper}>
        <IngredientItem
          ingredientItemClicked={ingredientItemClicked}
          array={array}
        />
      </ul>

      {isShowModal && (
        <Modal title="Детали ингредиента" onClose={() => setIsShowModal(false)}>
          <IngredientDetails item={itemToShowInModal} />
        </Modal>
      )}
    </div>
  );
};

export default IngredientsGroup;
