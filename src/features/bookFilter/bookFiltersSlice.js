import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    selectedAuthors: [],
    selectedGenres: [],
    priceRange: [0, 300],
    selectedRating: null,
    selectedSort: "averageRating",
    pageSize: 20,
    search: "",
  },
  reducers: {
    setAuthors: (state, action) => {
      state.selectedAuthors = action.payload;
    },
    setGenres: (state, action) => {
      state.selectedGenres = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setRating: (state, action) => {
      state.selectedRating = action.payload;
    },
    setSort: (state, action) => {
      state.selectedSort = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setBookSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  setAuthors,
  setGenres,
  setPriceRange,
  setRating,
  setSort,
  setPageSize,
  setBookSearch,
} = filtersSlice.actions;

export default filtersSlice.reducer;
