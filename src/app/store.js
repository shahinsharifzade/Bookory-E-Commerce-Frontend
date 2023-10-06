import { configureStore } from "@reduxjs/toolkit";
import filtersReducers from "../features/bookFilter/bookFiltersSlice";
import companyFilterReducers from "../features/companyFilter/companyFiltersSlice";
import companyBookFiltersReducers from "../features/companyBookFilter/companyBookFiltersSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducers,
    companyFilters: companyFilterReducers,
    companyBookFilters: companyBookFiltersReducers,
  },
});
