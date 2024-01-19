import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersSlice/userSlice";
import productReducer from "./productSlice/productSlice";
import profilereducer from "./Features/profileSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    profile: profilereducer,
  },
});
