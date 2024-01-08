import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cart: [],
  wish: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemToAdd = action.payload;

      const existingItemIndex = state.cart.findIndex(item => item._id === itemToAdd._id);

      if (existingItemIndex === -1) {
        state.cart.push(itemToAdd);
      } else {
        console.log("Item already exists in the cart");
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Item already exists in the cart",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    removeAddToCart: (state, action)=>{
      const itemToRemove = action.payload;
      state.cart = state.cart.filter(item => item._id !== itemToRemove._id);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item removed from the cart list",
        showConfirmButton: false,
        timer: 900,
      });
    },
    wishList: (state, action) => {
      const itemToAdd = action.payload;

      const existingItemIndex = state.wish.findIndex(item => item._id === itemToAdd._id);

      if (existingItemIndex === -1) {
        state.wish.push(itemToAdd);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully added in the wish list",
          showConfirmButton: false,
          timer: 1600,
        });
      } else {
        console.log("Item already exists in the wish list");
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Item already exists in the wish list",
          showConfirmButton: false,
          timer: 1600,
        });
      }
    },
    removeWishList: (state, action) => {
      const itemToRemove = action.payload;
      state.wish = state.wish.filter(item => item._id !== itemToRemove._id);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item removed from the wish list",
        showConfirmButton: false,
        timer: 900,
      });
    },
  },
});

export const { addToCart, wishList, removeWishList, removeAddToCart } = productSlice.actions;
export default productSlice.reducer;
