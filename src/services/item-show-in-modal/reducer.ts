import { IngredientsData } from "@/types/interface.ingredients";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/services/reducer";

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
    setItemShowInModal(state, action: PayloadAction<IngredientsData>) {
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

export const { setItemShowInModal, clearItemShowInModal } =
  itemShowInModalSlice.actions;
export default itemShowInModalSlice.reducer;
