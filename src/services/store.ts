import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";
import thunk from "redux-thunk";

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};

// import {applyMiddleware} from "redux";
// import {customMiddleware} from "./middleware/custom-middleware";
// import thunk from "redux-thunk";
// applyMiddleware(thunk)
