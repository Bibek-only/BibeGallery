import ReactDOM from "react-dom/client";

import "./index.css";

import router from "./router/router";
import { RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
