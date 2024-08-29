import React from "react";
import ReactDOM from "react-dom/client";
import "./css/reset.css";
import "./index.css";
import "@/css/common.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@/services/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = configureStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
