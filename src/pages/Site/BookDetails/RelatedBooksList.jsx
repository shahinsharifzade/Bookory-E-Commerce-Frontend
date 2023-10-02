import axios from "axios";
import React from "react";
import Qs from "qs";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";

const PAGE_NUMBER = 1;
const PAGE_SIZE = 6;

const fetchBooks = async ({ pageNumber, pageSize, selectedGenres }) => {
  console.log(
    "🚀 ~ file: RelatedBooksList.jsx:11 ~ fetchBooks ~ selectedGenres:",
    selectedGenres,
  );

  const params = {
    pageNumber,
    pageSize,
    "filters.Genres": selectedGenres,
  };

  const response = await axios.get(`https://localhost:7047/api/Books/paged`, {
    params: params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: "repeat" });
    },
  });

  console.log(
    "🚀 ~ file: RelatedBooksList.jsx:30 ~ fetchBooks ~ response.data:",
    response.data,
  );
  return response.data;
};

const RelatedBooksList = ({ selectedGenres }) => {
  const {
    data: booksData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["books", PAGE_NUMBER, PAGE_SIZE, selectedGenres],
    queryFn: () =>
      fetchBooks({
        pageNumber: PAGE_NUMBER,
        pageSize: PAGE_SIZE,
        selectedGenres,
      }),
    retry: false,
  });

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <div className="mb-16 flex  items-center gap-8">
        <div className="shrink-0 text-[3rem] ">Related Books</div>
        <div className="max-h-[1px] w-full border border-solid border-secondaryText"></div>
      </div>
    </div>
  );
};

export default RelatedBooksList;
