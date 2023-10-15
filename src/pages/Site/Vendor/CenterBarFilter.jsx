import { setSort } from "../../../features/companyFilter/companyFiltersSlice.js";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner.jsx";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useGetAll } from "../../../service/companyService.js";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CenterBarFilter = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sortBy = useSelector((state) => state.companyFilters.sortBy);
  const { data, isLoading, isError, error } = useGetAll();

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
      console.log(error?.response.data.statusCode === 404);
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  const sortArray = [
    {
      value: "newest",
      name: "Most Recent",
    },
    {
      value: "averageRating",
      name: "Avarage rating",
    },
    {
      value: "popularity",
      name: "Popularity",
    },
  ];

  const handleSortType = (value) => {
    dispatch(setSort(value));
  };

  const handleSearchBoxOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="container">
      <div className="mb-6 mt-24 flex items-center justify-between rounded-3xl px-12 py-8 shadow-2xl">
        <p className="text-xl font-light">
          Total stores showing : {data.length}
        </p>

        <div className="flex gap-6">
          <div
            className="flex cursor-pointer gap-4 rounded-[3rem] bg-primaryText px-6 py-4 text-xl text-white"
            onClick={handleSearchBoxOpen}
          >
            <Search size={"20px"} />
            <p>Search</p>
          </div>

          <div>
            <FormControl
              sx={{
                width: 140,
                "& .MuiSelect-select": {
                  fontSize: 12,
                  padding: "10px 6px",
                  fontWeight: 600,
                },
              }}
            >
              <InputLabel
                id="sort-store-label"
                sx={{ fontSize: "12px", fontWeight: 600 }}
              >
                Default Sorting
              </InputLabel>

              <Select
                sx={{
                  boxShadow: "none",
                  fontSize: "16px",
                  ".MuiOutlinedInput-notchedOutline": {
                    border: "1px #e6e6e6 solid",
                    borderRadius: "10px",
                  },
                }}
                labelId="sort-store-label"
                id="demo-simple-select"
                defaultValue="averageRating"
                value={sortBy}
                label="Avarage Rating"
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
        </div>
      </div>
    </div>
  );
};

export default CenterBarFilter;
