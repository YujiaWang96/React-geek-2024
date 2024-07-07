//根模块store，组合子模块
import userReducer from "./modules/user";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default store;
