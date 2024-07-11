import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import { store } from "./redux";

import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import { store } from "./redux";
import { ToastProvider } from "./components/CustomToast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </Provider>
);
