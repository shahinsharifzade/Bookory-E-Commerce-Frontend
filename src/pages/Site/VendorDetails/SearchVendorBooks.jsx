import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../../features/companyBookFilter/companyBookFiltersSlice";

const SearchVendorBooks = () => {
  const search = useSelector((state) => state.companyBookFilters.search);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearch(searchValue));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex w-min rounded-[3rem] border border-solid border-secondaryText">
          <input
            type="text"
            placeholder="Enter Product Name"
            className="rounded-[3rem] px-12 py-4 pr-24 font-medium focus:border-primaryText"
            defaultValue={search}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="rounded-[3rem] bg-primaryText px-12 py-4 text-white"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchVendorBooks;
