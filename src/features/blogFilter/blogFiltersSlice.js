import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    search: "",
    category: [],
    sortBy: "newest",
  },
  reducers: {
    setBlogSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSort: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setBlogSearch, setCategory, setSort } = filterSlice.actions;

export default filterSlice.reducer;
