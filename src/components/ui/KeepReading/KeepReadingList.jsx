import React from "react";
import KeepReadingItem from "./KeepReadingItem";
import KeepReadingMainItem from "./KeepReadingMainItem";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useGetSearchedBooks } from "../../../service/bookService";

const KeepReadingList = () => {
  const {
    data: booksData,
    isLoading: bookIsLoading,
    isError: booksError,
  } = useGetSearchedBooks();

  if (bookIsLoading) {
    return <LoadingSpinner isLoading={bookIsLoading} />;
  }

  if (booksError) {
    return <div>Error fetching data</div>;
  }

  const mainBook = booksData.slice(0, 1);
  const limitedBooksData = booksData.slice(1, 5);
  return (
    <div>
      <div className="mx-6 flex border-y-[1px] border-solid border-secondaryText max-[576px]:justify-center">
        <KeepReadingMainItem book={mainBook[0]} />
      </div>
      <div className="flex flex-wrap minw-sm:flex-row">
        {limitedBooksData.map((item, index) => {
          return <KeepReadingItem key={index} book={item} />;
        })}
      </div>
    </div>
  );
};

export default KeepReadingList;
