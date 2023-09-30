import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import ShopBookItem from "./ShopBookItem";
import { Pagination, Stack } from "@mui/material";
import Qs from "qs";

const PAGE_SIZE = 5;

const fetchBooks = async (
  pageNumber,
  pageSize,
  selectedAuthors,
  selectedGenres,
  priceRange,
  selectedRating,
  selectedSort,
) => {
  const params = {
    pageNumber,
    pageSize,
    "filters.Authors": selectedAuthors,
    "filters.Genres": selectedGenres,
    "filters.MinPrice": priceRange[0],
    "filters.MaxPrice": priceRange[1],
    "filters.Rating": selectedRating,
    "filters.SortBy": selectedSort,
  };

  const response = await axios.get(`https://localhost:7047/api/Books/paged`, {
    params: params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: "repeat" });
    },
  });

  const totalPage = response.data.totalCount;
  const books = response.data.books;
  return { books, totalPage };
};

const ShopBooksList = ({
  selectedAuthors,
  selectedGenres,
  priceRange,
  selectedRating,
  selectedSort,
}) => {
  const [pageNumber, setPageNumber] = useState(1);

  const {
    data: booksData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "books",
      pageNumber,
      PAGE_SIZE,
      selectedAuthors,
      selectedGenres,
      priceRange,
      selectedRating,
      selectedSort,
    ],
    queryFn: () =>
      fetchBooks(
        pageNumber,
        PAGE_SIZE,
        selectedAuthors,
        selectedGenres,
        priceRange,
        selectedRating,
        selectedSort,
      ),
    retry: false,
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
