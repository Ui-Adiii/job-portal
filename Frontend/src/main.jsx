import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <PersistGate  persistor={persistor}>
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>

  </PersistGate>
);
