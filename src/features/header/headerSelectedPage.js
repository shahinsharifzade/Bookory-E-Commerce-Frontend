import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    selectedPage: "Home",
  },
  reducers: {
    setPage: (state, action) => {
      state.selectedPage = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;

export default pageSlice.reducer;
