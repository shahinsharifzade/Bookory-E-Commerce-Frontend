import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Qs from "qs";

const getFilteredBooks = async (
  pageNumber,
  pageSize,
  selectedAuthors,
  selectedGenres,
  priceRange,
  selectedRating,
  selectedSort,
  search,
  storeId,
) => {
  const minPrice =
    priceRange && priceRange.length >= 2 ? priceRange[0] : undefined;
  const maxPrice =
    priceRange && priceRange.length >= 2 ? priceRange[1] : undefined;

  const params = {
    pageNumber,
    pageSize,
    "filters.Authors": selectedAuthors,
    "filters.Genres": selectedGenres,
    "filters.MinPrice": minPrice,
    "filters.MaxPrice": maxPrice,
    "filters.Rating": selectedRating,
    "filters.SortBy": selectedSort,
    "filters.Search": search,
    "filters.CompanyId": storeId,
  };

  const response = await axios.get(`https://localhost:7047/api/Books/paged`, {
    params: params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: "repeat" });
    },
  });

  return response.data;
};

export const useGetFilteredBooks = (
  pageNumber,
  pageSize,
  selectedAuthors,
  selectedGenres,
  priceRange,
  selectedRating,
  selectedSort,
  search,
  storeId,
) => {
  return useQuery({
    queryKey: [
      "books",
      pageNumber,
      pageSize,
      selectedAuthors?.join(","),
      selectedGenres?.join(","),
      priceRange,
      selectedRating,
      selectedSort,
      search,
      storeId,
    ],
    queryFn: () =>
      getFilteredBooks(
        pageNumber,
        pageSize,
        selectedAuthors,
        selectedGenres,
        priceRange,
        selectedRating,
        selectedSort,
        search,
        storeId,
      ),
  });
};
