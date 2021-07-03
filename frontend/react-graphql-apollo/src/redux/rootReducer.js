import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import reciboSlice from "./features/reciboSlice";

const rootReducer = combineReducers({
  user: userSlice,
  recibo: reciboSlice,
});

export default rootReducer;
