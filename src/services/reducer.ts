import { combineSlices } from "@reduxjs/toolkit";
import ingredientsSlice from "@/services/ingredients/reducer";
import itemShowInModalSlice from "@/services/item-show-in-modal/reducer";
import burgerConstructorSlice from "@/services/burger-constructor/reducer";
import orderInfoSlice from "@/services/create-order/reducer";
import authSlice from "@/services/auth/reducer";
import ordersFeedSlice from "@/services/orders-feed-all/reducer";
import ordersFeedProfileSlice from "@/services/orders-feed-profile/reducer";

export const rootReducer = combineSlices({
  ingredients: ingredientsSlice,
  burgerConstructor: burgerConstructorSlice,
  itemShowInModal: itemShowInModalSlice,
  orderInfo: orderInfoSlice,
  auth: authSlice,
  ordersFeedAll: ordersFeedSlice,
  ordersFeedProfile: ordersFeedProfileSlice,
});

export default rootReducer;
