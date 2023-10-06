import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    search: "",
    selectedSort: "averageRating",
  },
  reducers: {
    setSort: (state, action) => {
      state.selectedSort = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSort, setSearch } = filterSlice.actions;

export default filterSlice.reducer;
