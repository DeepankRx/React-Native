import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  cart: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product } = action.payload;
      const cart = state.cart;
      const index = cart.findIndex((item) => item._id === product._id);
      if (index === -1) {
        cart.push({ ...product, quantity: 1 });
      } else {
        cart[index].quantity++;
      }
      state.cart = cart;
      state.total = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      const { product } = action.payload;
      const cart = state.cart;
      const index = cart.findIndex((item) => item._id === product._id);
      if (index !== -1) {
        cart[index].quantity--;
        if (cart[index].quantity === 0) {
          cart.splice(index, 1);
        }
      }
      state.cart = cart;
      state.total = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.cart = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
