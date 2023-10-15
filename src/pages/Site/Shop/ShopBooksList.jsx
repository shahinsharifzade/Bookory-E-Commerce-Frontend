import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { Pagination, Stack } from "@mui/material";
import ShopBookItem from "./ShopBookItem";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetFilteredBooks } from "../../../service/bookService";
import { useNavigate } from "react-router-dom";

const ShopBooksList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();

  const selectedAuthors = useSelector((state) => state.filters.selectedAuthors);
  const selectedGenres = useSelector((state) => state.filters.selectedGenres);
  const priceRange = useSelector((state) => state.filters.priceRange);
  const selectedSort = useSelector((state) => state.filters.selectedSort);
  const selectedRating = useSelector((state) => state.filters.selectedRating);
  const pageSize = useSelector((state) => state.filters.pageSize);

  const {
    data: booksData,
    isLoading,
    isError,
    error,
  } = useGetFilteredBooks(
    pageNumber,
    pageSize,
    selectedAuthors,
    selectedGenres,
    priceRange,
    selectedRating,
    selectedSort,
  );

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
      console.log(error?.response.data.statusCode === 404);
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
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
            count={booksData.totalCount}
            page={pageNumber}
            onChange={(_, page) => setPageNumber(page)}
          />
        </Stack>
      </div>
    </div>
  );
};

export default ShopBooksList;
