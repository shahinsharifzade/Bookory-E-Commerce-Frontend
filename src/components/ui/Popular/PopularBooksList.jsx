import React, { useEffect } from "react";

import PopularBookItem from "./PopularBookItem";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useGetFilteredBooks } from "../../../service/bookService";

const PopularBooksList = () => {
  const navigate = useNavigate();

  const {
    data: booksData,
    isLoading: bookIsLoading,
    isError: booksError,
    error,
  } = useGetFilteredBooks(1, 8);

  useEffect(() => {
    if (booksError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [booksError]);

  if (bookIsLoading) return <LoadingSpinner isLoading={bookIsLoading} />;

  return (
    <div className="flex flex-wrap max-[992px]:justify-around">
      {booksData.books.map((item, index) => {
        return (
          <PopularBookItem key={index} book={item} booksArr={booksData.books} />
        );
      })}
    </div>
  );
};

export default PopularBooksList;
