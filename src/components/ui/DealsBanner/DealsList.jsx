import React from "react";
import DealsItem from "./DealsItem";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useGetFilteredBooks } from "../../../service/bookService";

const DealsList = () => {
  const {
    data: booksData,
    isLoading: bookIsLoading,
    isError: booksError,
  } = useGetFilteredBooks(
    1,
    3,
    undefined,
    undefined,
    undefined,
    undefined,
    "averageRating",
  );

  if (booksError) return <div>Error fetching data</div>;
  if (bookIsLoading) return <LoadingSpinner isLoading={bookIsLoading} />;

  return (
    <div>
      {booksData.books.map((item, index) => {
        return <DealsItem key={index} book={item} />;
      })}
    </div>
  );
};

export default DealsList;
