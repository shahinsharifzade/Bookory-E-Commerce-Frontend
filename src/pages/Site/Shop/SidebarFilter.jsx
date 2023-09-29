import React, { useState } from "react";
import FilterByAuthor from "./FilterByAuthor";
import FilterByGenre from "./FilterByGenre";
import Drawer from "@mui/material/Drawer";

const SidebarFilter = ({
  onAuthorsChange,
  onGenresChange,
  MuiDrawer,
  setMuiDrawer,
}) => {
  return (
    <>
      <Drawer
        anchor="left"
        open={MuiDrawer}
        onClose={() => setMuiDrawer(false)}
        sx={{
          "::-webkit-scrollbar": {
            width: "20px",
          },
          "::-webkit-scrollbar-thumb": { background: " #888" },
          "::-webkit-scrollbar-thumb:hover": { background: "#555" },
          "::-webkit-scrollbar-track": { background: "#f1f1f1" },
        }}
      >
        <div className="w-[300px] px-12 font-sora">
          <FilterByGenre onGenresChange={onGenresChange} />
          <FilterByAuthor onAuthorsChange={onAuthorsChange} />
        </div>
      </Drawer>
    </>
  );
};

export default SidebarFilter;
