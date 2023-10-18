import { Collapse } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStoreSearch } from "../../../features/companyFilter/companyFiltersSlice";

const SearchStore = ({ open }) => {
  const search = useSelector((state) => state.companyFilters.search);

  const [searchValue, setValueSearch] = useState("");

  const dispatch = useDispatch();

  return (
    <div className="container">
      <div
        className={`${
          open ? "py-8 " : ""
        }   mt-12 rounded-xl bg-[#fff] px-6 shadow-2xl`}
      >
        <Collapse in={open} timeout="auto" unmountOnExit>
          <form
            className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(setStoreSearch(searchValue));
            }}
          >
            <div className="">
              <input
                type="text"
                className={`h-[5rem] w-full border border-solid border-secondaryText px-4 text-xl font-normal focus:border-none `}
                placeholder="Search Vendors"
                defaultValue={search}
                onChange={(e) => {
                  e.preventDefault();
                  setValueSearch(e.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              className="mt-4 flex w-min self-end rounded-xl bg-primaryText px-10 py-4 text-xl text-white"
            >
              Apply
            </button>
          </form>
        </Collapse>
      </div>
    </div>
  );
};

export default SearchStore;
