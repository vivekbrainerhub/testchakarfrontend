import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import userSlice from "./slice/userSlice";
import productSlice from "./slice/productSlice";

export const persistConfig = {
  key: "demo",
  version: 1,
  storage,
};
const combinedReducer = combineReducers({
  user: userSlice,
  product: productSlice,
});

const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
