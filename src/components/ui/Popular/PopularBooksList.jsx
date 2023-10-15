import React, { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PopularBookItem from "./PopularBookItem";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const fetchBooks = async () => {
  const response = await axios
    .get(`https://localhost:7047/api/books`)
    .catch((error) => {
      console.log(error.response.data.message);
      return <div>{error.response.data.message}</div>;
    });
  return response.data;
};

const PopularBooksList = () => {
  const navigate = useNavigate();

  const {
    data: booksData,
    isLoading: bookIsLoading,
    isError: booksError,
    error,
  } = useQuery({ queryKey: ["books"], queryFn: fetchBooks });

  useEffect(() => {
    if (booksError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [booksError]);

  if (bookIsLoading) return <LoadingSpinner isLoading={bookIsLoading} />;
  const limitedBooksData = booksData.slice(0, 8);

  return (
    <div className="flex flex-wrap max-[992px]:justify-around">
      {limitedBooksData.map((item, index) => {
        return (
          <PopularBookItem
            key={index}
            book={item}
            booksArr={limitedBooksData}
          />
        );
      })}
    </div>
  );
};

export default PopularBooksList;
