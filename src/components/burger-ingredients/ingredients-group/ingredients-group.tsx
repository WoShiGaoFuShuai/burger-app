import React, { useState, forwardRef } from "react";

import cl from "./ingredients-group.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import IngredientDetails from "@/components/modal/ingredient-details/ingredient-details";
import Modal from "@/components/modal/modal";
import { IngredientsData } from "@/types/interface.ingredients";
import {
  itemShowInModalSelectors,
  setItemShowInModal,
  clearItemShowInModal,
} from "@/services/item-show-in-modal/reducer";
import { useDispatch, useSelector } from "react-redux";

interface IngredientsGroupProps {
  array: IngredientsData[];
  title: string;
}

const IngredientsGroup = forwardRef<HTMLDivElement, IngredientsGroupProps>(
  ({ array, title }, ref) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const dispatch = useDispatch();
    const itemToShowInModal = useSelector(
      itemShowInModalSelectors.getItemShowInModal
    );

    const ingredientItemClicked = (item: IngredientsData) => {
      dispatch(setItemShowInModal(item));
      setIsShowModal(true);
    };

    const closeModalWindow = () => {
      dispatch(clearItemShowInModal());
      setIsShowModal(false);
    };

    return (
      <div ref={ref} className="mb-10">
        <p className={`${cl.title} mb-6`}>{title}</p>

        <ul className={cl.ingredients__items_wrapper}>
          <IngredientItem
            ingredientItemClicked={ingredientItemClicked}
            array={array}
          />
        </ul>

        {isShowModal && (
          <Modal title="Детали ингредиента" onClose={closeModalWindow}>
            <IngredientDetails item={itemToShowInModal} />
          </Modal>
        )}
      </div>
    );
  }
);

// const IngredientsGroup: forwardRef <IngredientsGroupProps> = ({
//   array,
//   title,
// }) => {
//   const [isShowModal, setIsShowModal] = useState(false);
//   const dispatch = useDispatch();
//   const itemToShowInModal = useSelector(
//     itemShowInModalSelectors.getItemShowInModal
//   );

//   const ingredientItemClicked = (item: IngredientsData) => {
//     dispatch(setItemShowInModal(item));
//     setIsShowModal(true);
//   };

//   const closeModalWindow = () => {
//     dispatch(clearItemShowInModal());
//     setIsShowModal(false);
//   };

//   return (
//     <div className="mb-10">
//       <p className={`${cl.title} mb-6`}>{title}</p>

//       <ul className={cl.ingredients__items_wrapper}>
//         <IngredientItem
//           ingredientItemClicked={ingredientItemClicked}
//           array={array}
//         />
//       </ul>

//       {isShowModal && (
//         <Modal title="Детали ингредиента" onClose={closeModalWindow}>
//           <IngredientDetails item={itemToShowInModal} />
//         </Modal>
//       )}
//     </div>
//   );
// };

export default IngredientsGroup;
