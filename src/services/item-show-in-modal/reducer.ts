import { IngredientsData } from "../../types/interface.ingredients";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../services/store";

interface ItemShowModalState {
  itemShowInModal: IngredientsData | null;
}

const initialState: ItemShowModalState = {
  itemShowInModal: null,
};

const itemShowInModalSlice = createSlice({
  name: "itemShowInModal",
  initialState,
  reducers: {
    addItemShowInModal(state, action: PayloadAction<IngredientsData>) {
      state.itemShowInModal = action.payload;
    },
    clearItemShowInModal(state) {
      state.itemShowInModal = null;
    },
  },
});

export const itemShowInModalSelectors = {
  getItemShowInModal: (state: RootState) =>
    state.itemShowInModal.itemShowInModal,
};

export const { addItemShowInModal, clearItemShowInModal } =
  itemShowInModalSlice.actions;
export default itemShowInModalSlice.reducer;
