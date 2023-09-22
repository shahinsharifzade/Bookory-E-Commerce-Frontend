import React from "react";
import KeepReadingItem from "./KeepReadingItem";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import KeepReadingMainItem from "./KeepReadingMainItem";

const fetchBooks = async (search) => {
  const response = await axios
    .get(`https://localhost:7047/api/books`)
    .catch((error) => {
      console.log(error.response.data.message);
      return <div>{error.response.data.message}</div>;
    });
  return response.data;
};

const KeepReadingList = () => {
  const {
    data: booksData,
    isLoading: booksLoading,
    isError: booksError,
  } = useQuery({ queryKey: ["books"], queryFn: fetchBooks });

  if (booksLoading) {
    return <div>Loading...</div>;
  }

  if (booksError) {
    return <div>Error fetching data</div>;
  }

  const mainBook = booksData.slice(0, 1);
  const limitedBooksData = booksData.slice(1, 5);
  return (
    <div>
      <div className="mx-6 flex border-y-[1px] border-solid border-secondaryText max-[576px]:justify-center">
        <KeepReadingMainItem books={mainBook[0]} />
      </div>
      <div className="flex flex-wrap minw-sm:flex-row">
        {limitedBooksData.map((item, index) => {
          return <KeepReadingItem key={index} books={item} />;
        })}
      </div>
    </div>
  );
};

export default KeepReadingList;
