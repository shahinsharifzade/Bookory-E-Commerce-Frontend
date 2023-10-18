import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    pageNumber: 1,
    pageSize: 3,
    search: "",
    sortBy: "averageRating",
  },
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setStoreSearch: (state, action) => {
      state.search = action.payload;
    },
    setSort: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setPageNumber, setStoreSearch, setSort } = filtersSlice.actions;

export default filtersSlice.reducer;
