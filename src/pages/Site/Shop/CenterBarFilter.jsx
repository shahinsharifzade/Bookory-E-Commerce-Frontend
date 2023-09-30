import React, { useState } from "react";
import { Sliders } from "lucide-react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./CenterBarFilter.css";

const CenterBarFilter = ({ setMuiDrawer, onSortChange }) => {
  const [sortBy, setSortBy] = useState("");

  const handleSortType = (value) => {
    setSortBy(value);
    onSortChange(value);
  };

  return (
    <div className="container border-b border-solid border-[#b8b8b8] pb-4 pt-24">
      <div className="flex items-center justify-between">
        <div
          className="flex cursor-pointer items-center gap-4"
          onClick={() => setMuiDrawer(true)}
        >
          <Sliders size={"18px"} />
          <p className="text-xl font-semibold">Filter</p>
        </div>

        <div>
          <FormControl sx={{ m: 1, width: 160 }}>
            <InputLabel id="demo-simple-select-label">
              Default Sorting
            </InputLabel>
            <Select
              sx={{
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortBy}
              label="Default Sorting"
              onChange={(e) => handleSortType(e.target.value)}
            >
              <MenuItem value={""}>Default </MenuItem>
              <MenuItem value={"priceLowToHigh"}>Price low to high </MenuItem>
              <MenuItem value={"priceHighToLow"}>Price high to low </MenuItem>
              <MenuItem value={"averageRating"}>Avarage rating</MenuItem>
              <MenuItem value={"newest"}>Newest</MenuItem>
              <MenuItem value={"popularity"}>Popularity</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default CenterBarFilter;
