import { configureStore } from "@reduxjs/toolkit";
import filtersReducers from "../features/bookFilter/bookFiltersSlice";
import companyFilterReducers from "../features/companyFilter/companyFiltersSlice";
import companyBookFiltersReducers from "../features/companyBookFilter/companyBookFiltersSlice";
import headerReducers from "../features/header/headerSelectedPage";
import blogFiltersReducers from "../features/blogFilter/blogFiltersSlice";
import authSlice from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducers,
    companyFilters: companyFilterReducers,
    companyBookFilters: companyBookFiltersReducers,
    header: headerReducers,
    blogFilters: blogFiltersReducers,
    auth: authSlice,
  },
});
