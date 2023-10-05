import React from "react";
import { LayoutGrid, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import HeaderSearchBox from "./HeaderSearchBox";
import HeaderGenreList from "./HeaderGenreList";

const HeaderSearchBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex w-full justify-center">
      <div
        className="relative  w-full max-w-[250px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="ml-8 mr-5 hidden cursor-pointer items-center justify-between rounded-[4rem] bg-primaryText px-[3rem] py-[1.5rem] text-xl font-medium text-white minw-1000:flex">
          <div className="flex items-center">
            <div className="mr-2 ">
              <LayoutGrid
                size={"1.6rem"}
                className={` ${isHovered ? "opacity-100" : "opacity-70"}`}
              />
            </div>
            <p>Categories</p>
          </div>
          <div>
            <ChevronDown
              size={"1.5rem"}
              className={` ${isHovered ? "opacity-100" : "opacity-70"}`}
            />
          </div>
        </div>
        <HeaderGenreList isHovered={isHovered} />
      </div>
      <HeaderSearchBox />
    </div>
  );
};

export default HeaderSearchBar;
