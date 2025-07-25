import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import themeReducer from "./theme/themeSlice.js";
import userReducer from "./user/userSlice.js";


const rootReducer = combineReducers({
  theme: themeReducer,
  user:userReducer
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["theme", "user"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
