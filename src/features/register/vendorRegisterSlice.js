import { createSlice } from "@reduxjs/toolkit";

const vendorRegisterSlice = createSlice({
  name: "vendorRegister",
  initialState: {
    username: "",
  },
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = vendorRegisterSlice.actions;
export default vendorRegisterSlice.reducer;
