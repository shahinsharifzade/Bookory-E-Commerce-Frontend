import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalPrice: 0,
  },
  reducers: {
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
  },
});

export const { setTotalPrice } = cartSlice.actions;
export default cartSlice.reducer;
