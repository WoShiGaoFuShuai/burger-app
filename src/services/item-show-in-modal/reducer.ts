import { IngredientsData } from "@/types/interface.ingredients";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/services/reducer";

interface ItemShowModalState {
  itemShowInModal: IngredientsData | null;
}

const initialState: ItemShowModalState = {
  itemShowInModal: {
    _id: "60666c42cc7b410027a1a9b1",
    name: "ЭТО ФЕЙК",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  },
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
  // extraReducers: {},
});

export const itemShowInModalSelectors = {
  getItemShowInModal: (state: RootState) =>
    state.itemShowInModal.itemShowInModal,
};

export const { setItemShowInModal, clearItemShowInModal } =
  itemShowInModalSlice.actions;
export default itemShowInModalSlice.reducer;
