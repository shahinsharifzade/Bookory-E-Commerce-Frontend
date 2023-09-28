import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import ShopBookItem from "./ShopBookItem";
import { Pagination, Stack } from "@mui/material";

const PAGE_SIZE = 5;

const fetchBooks = async (pageNumber, pageSize) => {
  const response = await axios
    .get(`https://localhost:7047/api/Books/paged`, {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    })
    .catch((error) => {
      return <div>{error.response.data.message}</div>;
    });

  const totalPage = response.data.totalCount;
  const books = response.data.books;

  return { books, totalPage };
};

const ShopBooksList = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const {
    data: booksData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["books", pageNumber, PAGE_SIZE],
    queryFn: () => fetchBooks(pageNumber, PAGE_SIZE),
  });

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="container ">
      <div className="flex flex-wrap">
        {booksData.books.map((book, index) => (
          <ShopBookItem key={index} book={book} />
        ))}
        <div className="flex justify-center pb-24"></div>
      </div>
      <div className="flex items-center justify-center pb-8">
        <Stack spacing={3}>
          <Pagination
            count={booksData.totalPage}
            page={pageNumber}
            onChange={(_, page) => setPageNumber(page)}
          />
        </Stack>
      </div>
    </div>
  );
};

export default ShopBooksList;
