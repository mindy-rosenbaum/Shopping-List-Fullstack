import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type CartItem, type CartState } from '../types';

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice = existingItem.pricePerUnit * existingItem.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(item => item.productId === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          existingItem.totalPrice = existingItem.pricePerUnit * existingItem.quantity;
        } else {
          state.items = state.items.filter(item => item.productId !== action.payload);
        }
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;