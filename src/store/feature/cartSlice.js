import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // Use 'cartItems' for clarity
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(state, action) {
      state.cartItems.push(action.payload); // Use push for efficient appends
    },
    removeCartItem(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload // Safer removal based on ID
      );
      if (itemIndex !== -1) { // Check if item exists before splicing
        state.cartItems.splice(itemIndex, 1);
      }
    },
    clearCartItems(state) {
      state.cartItems = []; // Clear the entire array for efficiency
    },
  },
});

export const { addCartItem, removeCartItem, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
