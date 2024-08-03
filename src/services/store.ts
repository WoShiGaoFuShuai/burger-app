import { configureStore as createReduxToolkitStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

export const configureStore = () => {
  return createReduxToolkitStore({
    reducer: rootReducer,
  });
};

export type AppDispatch = ReturnType<typeof configureStore>["dispatch"];
export type RootState = ReturnType<
  ReturnType<typeof configureStore>["getState"]
>;
