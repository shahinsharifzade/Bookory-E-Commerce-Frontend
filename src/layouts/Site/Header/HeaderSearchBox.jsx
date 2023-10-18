import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import HeaderSearchItemsList from "./HeaderSearchItemsList";
import { useDispatch, useSelector } from "react-redux";
import { setBookSearch } from "../../../features/bookFilter/bookFiltersSlice";

const HeaderSearchBox = () => {
  const search = useSelector((state) => state.filters.search);

  const dispatch = useDispatch();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleCheckOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        dispatch(setBookSearch(""));
      }
    };

    document.addEventListener("mousedown", handleCheckOutside);

    return () => {
      document.removeEventListener("mousedown", handleCheckOutside);
    };
  }, [searchInputRef]);

  return (
    <div
      ref={searchInputRef}
      className="md:flex relative hidden w-full max-w-[55rem] minw-1000:block"
    >
      <Paper
        component="form"
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          px: 1,
          py: 0.5,
          backgroundColor: "#F6F6F6",
          borderRadius: "4rem",
          maxWidth: "55rem",
          height: "100%",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, fontWeight: "600", fontSize: "14px" }}
          placeholder="Search products..."
          inputProps={{ "aria-label": "search" }}
          value={search}
          onChange={(e) => dispatch(setBookSearch(e.target.value))}
        />
        <IconButton type="submit">
          <SearchOutlined sx={{ color: "black" }} />
        </IconButton>
      </Paper>

      <HeaderSearchItemsList />
    </div>
  );
};

export default HeaderSearchBox;
