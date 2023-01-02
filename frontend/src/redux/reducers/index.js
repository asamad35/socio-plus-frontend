import { combineReducers } from "@reduxjs/toolkit";
import chatReducer from "./chatReducer";
import testReducer2 from "./testReducer2";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  authReducer,
  chatReducer,
  testReducer2,
});

export default rootReducer;
