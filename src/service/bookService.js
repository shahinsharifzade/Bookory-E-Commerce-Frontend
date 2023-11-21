import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Qs from "qs";
import { api, authApi } from "../api";
import { useNavigate } from "react-router-dom";
import {
  showToastInfoMessage,
  showToastSuccessMessage,
} from "../utils/toastUtils";

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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

  const response = await api.get(`Books/paged`, {
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
      "approved",
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
    retry: false,
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getSearchedBooks = async (search) => {
  const response = await api.get(`/Books`, {
    params: {
      search,
    },
  });

  return response.data;
};

export const useGetSearchedBooks = (search) => {
  return useQuery({
    queryKey: ["book", "approved", search],
    queryFn: () => getSearchedBooks(search),
    retry: false,
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getPendingOrRejectedBooks = async () => {
  var response = await authApi.get("books/pending-or-rejected");

  return response.data;
};

export const useGetPendingOrRejectedBooks = () => {
  return useQuery({
    queryKey: ["books", "pendingorrejected"],
    queryFn: () => getPendingOrRejectedBooks(),
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const approveBook = async (id) => {
  var response = await authApi.post(`books/${id}/approve`);

  return response;
};

export const useApproveBook = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id) => approveBook(id),
    onSuccess: () => {
      showToastSuccessMessage("Book approved");
      queryClient.invalidateQueries("books");
      queryClient.invalidateQueries("approved");
      navigate("/admin/books");
    },
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const rejectBook = async (id) => {
  var response = await authApi.post(`books/${id}/reject`);

  return response;
};

export const useRejectBook = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id) => rejectBook(id),
    onSuccess: () => {
      showToastInfoMessage("Book rejeceted");
      queryClient.invalidateQueries("books");
      queryClient.invalidateQueries("pendingorrejected");
      navigate("/admin/books");
    },
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const deleteBook = async (id) => {
  const response = await authApi.delete(`books/${id}`);

  return response.data;
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      showToastSuccessMessage("Book successfully deleted");
      queryClient.invalidateQueries(["books", "approved"]);
      queryClient.invalidateQueries(["books", "pending"]);
    },
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const addBook = async (data) => {
  const formData = new FormData();

  for (const key in data) {
    if (data[key] instanceof FileList || data[key] instanceof Array) {
      Array.from(data[key]).forEach((image) => formData.append(key, image));
    } else {
      formData.append(key, data[key]);
    }
  }

  const response = authApi.post("books", formData);

  return response.data;
};

export const useAddBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => addBook(data),
    onSuccess: () => {
      showToastSuccessMessage("Book successfully added");
      queryClient.invalidateQueries([
        "books",
        // "approved",
        // "authors",
        // "pendingorrejected",
      ]);
    },
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const updateBook = async (data) => {
  console.log("🚀 ~ file: bookService.js:229 ~ updateBook ~ data:", data);
  const formData = new FormData();

  for (const key in data) {
    if (data[key] instanceof FileList || data[key] instanceof Array) {
      Array.from(data[key]).forEach((image) => formData.append(key, image));
    } else {
      formData.append(key, data[key]);
    }
  }

  const response = authApi.put("books", formData);

  return response.data;
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateBook(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["books", "approved"]);
      queryClient.invalidateQueries(["books", "pendingorrejected"]);
      showToastSuccessMessage("Book successfully updated");
    },
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getById = async (id) => {
  const response = await api.get(`books/${id}`);

  return response.data;
};

export const useGetBookById = (id) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => getById(id),
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getCompanyBooksById = async (id) => {
  const response = await api.get(`books/company/${id}`);

  return response.data;
};

export const useGetCompanyBooksById = (id) => {
  return useQuery({
    queryKey: ["books", id],
    queryFn: () => getCompanyBooksById(id),
  });
};
