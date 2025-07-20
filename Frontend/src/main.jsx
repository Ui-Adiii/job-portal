import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./components/customs/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </ThemeProvider>
    </Provider>
  </PersistGate>
);
