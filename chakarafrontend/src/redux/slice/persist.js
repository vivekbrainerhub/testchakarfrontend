import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { userSlice } from "./userSlice";

export const persistConfig = {
  key: "demo",
  version: 1,
  storage,
};
const combinedReducer = combineReducers({
  user: userSlice,
});

const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
