import React from "react";
import Slider from "@mui/material/Slider";

const FilterByPrice = ({ onPriceRangeChange }) => {
  const [value, setValue] = React.useState([0, 300]);

  const handleChange = (event, newValue) => {
    onPriceRangeChange(newValue);
    setValue(newValue);
  };

  return (
    <div className="mb-8">
      <h5 className="mb-12  border-b border-solid border-[#999999] pb-6  pt-20 text-2xl font-semibold">
        Filter By Price
      </h5>
      <Slider
        getAriaLabel={() => "Price Range Filter"}
        value={value}
        aria-labelledby="range-slider"
        max={300}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
      <div className="text-lg ">
        <span className="text-[#999999]">Price: </span>${value[0]} - {value[1]}
      </div>
    </div>
  );
};

export default FilterByPrice;
