import { configureStore } from "@reduxjs/toolkit";
import filtersReducers from "../features/bookFilter/bookFiltersSlice";
import companyFilterReducers from "../features/companyFilter/companyFiltersSlice";
import companyBookFiltersReducers from "../features/companyBookFilter/companyBookFiltersSlice";
import headerReducers from "../features/header/headerSelectedPage";
import blogFiltersReducers from "../features/blogFilter/blogFiltersSlice";
import authReducers from "../features/auth/authSlice";
import vendorRegisterReducers from "../features/register/vendorRegisterSlice";
import cartReducers from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducers,
    companyFilters: companyFilterReducers,
    companyBookFilters: companyBookFiltersReducers,
    header: headerReducers,
    blogFilters: blogFiltersReducers,
    auth: authReducers,
    vendorRegistration: vendorRegisterReducers,
    cart: cartReducers,
  },
});
