import React, { useState } from "react";
import FilterByAuthor from "./FilterByAuthor";
import FilterByGenre from "./FilterByGenre";
import Drawer from "@mui/material/Drawer";
import FilterByPrice from "./FilterByPrice";
import FilterByRating from "./FilterByRating";

const SidebarFilter = ({ MuiDrawer, setMuiDrawer }) => {
  return (
    <>
      <Drawer
        anchor="left"
        open={MuiDrawer}
        onClose={() => setMuiDrawer(false)}
      >
        <div className="w-[300px] px-12 font-sora">
          <FilterByGenre />
          <FilterByAuthor />
          <FilterByPrice />
          <FilterByRating />
        </div>
      </Drawer>
    </>
  );
};

export default SidebarFilter;
