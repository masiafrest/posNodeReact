import { configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // reducer: rootReducer,
});

export let persistor = persistStore(store);
persistor.purge();

export default store;
