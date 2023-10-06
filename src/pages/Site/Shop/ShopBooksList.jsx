import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { Pagination, Stack } from "@mui/material";
import ShopBookItem from "./ShopBookItem";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Qs from "qs";

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

const ShopBooksList = () => {
  const [pageNumber, setPageNumber] = useState(1);

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
  } = useQuery({
    queryKey: [
      "books",
      pageNumber,
      pageSize,
      selectedAuthors,
      selectedGenres,
      priceRange,
      selectedRating,
      selectedSort,
    ],
    queryFn: () =>
      fetchBooks(
        pageNumber,
        pageSize,
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
