import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersSlice/userSlice";
import productReducer from "./productSlice/productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer
  },
});
