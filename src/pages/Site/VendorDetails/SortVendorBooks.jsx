import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../../features/companyBookFilter/companyBookFiltersSlice";

const SortVendorBooks = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.companyBookFilters.selectedSort);
  console.log(sortBy);

  const handleSortType = (value) => {
    dispatch(setSort(value));
  };

  const sortArray = [
    {
      value: "priceLowToHigh",
      name: "Price low to high",
    },
    {
      value: "priceHighToLow",
      name: "Price high to low",
    },
    {
      value: "averageRating",
      name: "Avarage rating",
    },
    {
      value: "newest",
      name: "Newest",
    },
    {
      value: "popularity",
      name: "Popularity",
    },
  ];

  return (
    <div>
      <FormControl
        sx={{
          width: 160,
          "& .MuiSelect-select": {
            fontSize: 12,
            padding: "10px 6px",
            fontWeight: 600,
          },
        }}
      >
        <InputLabel id="sort-label" sx={{ fontSize: "12px", fontWeight: 600 }}>
          Default Sorting
        </InputLabel>
        <Select
          sx={{
            // border: "2px #f65d4e solid",
            // margin: "4px 0",
            borderRadius: "3rem",
            boxShadow: "none",
            fontSize: "16px",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
          }}
          labelId="sort-label"
          id="demo-simple-select"
          defaultValue="averageRating"
          value={sortBy}
          label="Default Sorting"
          onChange={(e) => handleSortType(e.target.value)}
        >
          {sortArray.map((menuItem, index) => (
            <MenuItem key={index} value={menuItem.value}>
              {menuItem.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SortVendorBooks;
