import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersSlice/userSlice";
import productReducer from "./productSlice/productSlice";
import profilereducer from "./Features/profileSlice";
import { rootApi } from "./Api/publicApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    profile: profilereducer,
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
});
