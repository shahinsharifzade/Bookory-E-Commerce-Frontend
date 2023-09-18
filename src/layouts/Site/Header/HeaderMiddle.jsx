import React from "react";
import { useState, useRef } from "react";
import Logo from "../../../assets/logo.svg";

import { SearchOutlined } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  User2,
  Heart,
  ShoppingBasket,
  LayoutGrid,
  ChevronDown,
} from "lucide-react";

const fetchData = async () => {
  const response = await axios.get("https://localhost:7047/api/genres");
  return response.data;
};

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

const HeaderMiddle = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchData,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [book, setBook] = useState(null);
  const searchValue = useRef();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleInputChange = async (event) => {
    event.preventDefault();
    console.log(searchValue.current.value);
    const search = searchValue.current.value;
    if (searchValue.current.value == "") {
      setBook(null);
    } else {
      const books = await fetchBooks(search);
      setBook(books);
    }
  };

  const {
    data: booksData,
    isLoading: booksLoading,
    isError: booksError,
  } = useQuery({ queryKey: ["books"], queryFn: fetchBooks });

  if (isLoading || booksLoading) {
    return <div>Loading...</div>;
  }

  if (isError || booksError) {
    return <div>Error fetching data</div>;
  }

  return (
    <section>
      <div className="container flex py-[3rem]">
        <div className="flex items-center md:mr-[40px] lg:mr-[10rem]">
          <a href="#">
            <img src={Logo} alt="Logo" />
          </a>
        </div>

        <div className="flex w-full justify-between">
          <div className="maxw-md:justify-center  flex w-full">
            {/*  */}

            <div className="relative  w-full max-w-[250px]">
              <div
                className="mr-5 flex cursor-pointer items-center justify-between rounded-[4rem] bg-primaryText px-[3rem] py-[1.5rem] text-xl font-medium text-white"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center">
                  <div className="mr-2 ">
                    <LayoutGrid size={"1.6rem"} />
                  </div>
                  <p>Categories</p>
                </div>
                <div>
                  <ChevronDown size={"1.5rem"} />
                </div>
              </div>
              <div
                className={`absolute left-0 top-full ${
                  isHovered ? "block" : "hidden"
                }`}
              >
                <ul>
                  {data.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              {book !== null ? (
                Array.isArray(book) && book.length > 0 ? (
                  book.map((item) => <li key={item.id}>{item.title}</li>)
                ) : (
                  <p>No books found.</p>
                )
              ) : null}
            </div>

            <div className="hidden w-full md:flex ">
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
                // onSubmit={handleSubmit}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1, fontWeight: "600", fontSize: "14px" }}
                  placeholder="Search products..."
                  inputProps={{ "aria-label": "search" }}
                  inputRef={searchValue}
                  onChange={handleInputChange}
                />
                <IconButton type="submit">
                  <SearchOutlined sx={{ color: "black" }} />
                </IconButton>
              </Paper>
            </div>
          </div>

          <div className="flex items-center font-normal">
            <a className="cursor-pointer border-r border-solid border-[#e6e6e6] text-black">
              <User2
                size={"2rem"}
                strokeWidth={"1.2px"}
                className="ml-2 mr-2 font-normal"
              />
            </a>
            <a className=" cursor-pointer border-r border-solid border-[#e6e6e6] text-black">
              <Heart
                size={"2rem"}
                strokeWidth={"1.2px"}
                className="ml-2 mr-2 font-normal"
              />
            </a>
            <a className="cursor-pointer  text-black">
              <ShoppingBasket
                size={"2rem"}
                strokeWidth={"1.2px"}
                className="ml-2 mr-2 font-normal"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderMiddle;
4;
