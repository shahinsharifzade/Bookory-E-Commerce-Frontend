import React from "react";
import { SearchOutlined } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import HeaderSearchItem from "./HeaderSearchItem";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";

const fetchBooks = async (search) => {
  const response = await axios
    .get(`https://localhost:7047/api/books`, {
      params: {
        search: search || "",
      },
    })
    .catch((error) => {
      console.log(error.response.data.message);
      return <div>{error.response.data.message}</div>;
    });
  return response.data;
};

const HeaderSearchBox = () => {
  const handleInputChange = async (event) => {
    event.preventDefault();
    const search = searchValue.current.value;
    if (searchValue.current.value === "") {
      setBook(null);
    } else {
      const books = await fetchBooks(search);
      setBook(books);
    }
  };

  const [book, setBook] = useState(null);
  const searchValue = useRef();

  const {
    data: booksData,
    isLoading: bookIsLoading,
    isError: booksError,
  } = useQuery({ queryKey: ["books"], queryFn: fetchBooks });

  if (bookIsLoading) {
    return <LoadingSpinner isLoading={bookIsLoading} />;
  }

  if (booksError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="md:flex relative hidden w-full max-w-[55rem] minw-1000:block">
      <div className="absolute left-0 top-[111%]  w-full  bg-white">
        <ul className="mt-[24px] rounded-3xl border border-t-0 border-solid border-[#e4e4e4] bg-[#fff]">
          {book !== null ? (
            Array.isArray(book) && book.length > 0 ? (
              book.map((item) => {
                return <HeaderSearchItem item={item} />;
              })
            ) : (
              <p className="px-4 py-5">No books found.</p>
            )
          ) : null}
        </ul>
      </div>

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
          inputRef={searchValue}
          onChange={handleInputChange}
          onBlur={() => {
            searchValue.current.value = "";
            setBook(null);
          }}
        />
        <IconButton type="submit">
          <SearchOutlined sx={{ color: "black" }} />
        </IconButton>
      </Paper>
    </div>
  );
};

export default HeaderSearchBox;
