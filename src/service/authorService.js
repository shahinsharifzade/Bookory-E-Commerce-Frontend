import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  showToastInfoMessage,
  showToastSuccessMessage,
} from "../utils/toastUtils";
import { api, authApi } from "../api";
import { useNavigate } from "react-router-dom";

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getFilteredAuthors = async (pageNumber, pageSize) => {
  const params = {
    pageNumber,
    pageSize,
  };

  const response = await api.get("Authors/paged", {
    params: params,
  });

  return response.data;
};

export const useGetFilteredAuthors = (pageNumber, pageSize) => {
  return useQuery({
    queryKey: ["authors", pageNumber, pageSize],
    queryFn: () => getFilteredAuthors(pageNumber, pageSize),
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getAllAuthors = async () => {
  const response = await api.get("Authors");

  return response.data;
};

export const useGetAllAuthors = () => {
  return useQuery({
    queryKey: ["authors"],
    queryFn: () => getAllAuthors(),
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getById = async (id) => {
  const response = await api.get(`authors/${id}`);

  return response.data;
};

export const useGetAuthorById = (id) => {
  return useQuery({
    queryKey: ["auhtor", id],
    queryFn: () => getById(id),
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const deleteAuthor = async (id) => {
  const response = await authApi.delete(`Authors/${id}`);

  return response.data;
};

export const useDeleteAuthor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAuthor,
    onSuccess: () => {
      showToastSuccessMessage("Author successfully deleted");
      queryClient.invalidateQueries("authors");
    },
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const addAuthor = async (data) => {
  const formData = new FormData();
  for (const key in data) {
    console.log(data[key]);

    if (data[key] instanceof FileList)
      Array.from(data[key]).forEach((image) => formData.append(key, image));
    else formData.append(key, data[key]);
  }

  const response = await authApi.post("authors", formData);

  return response.data;
};

export const useAddAuthor = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: addAuthor,
    onSuccess: () => {
      showToastSuccessMessage("Author successfully added");
      queryClient.invalidateQueries("authors");
    },
  });
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const putAuthor = async (data) => {
  const formData = new FormData();

  for (const key in data) {
    if (data[key] instanceof Array) {
      Array.from(data[key]).forEach((image) =>
        formData.append("images", image),
      );
    } else formData.append(key, data[key]);
  }

  const response = await authApi.put("authors", formData);

  return response.data;
};

export const useUpdateAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putAuthor,
    onSuccess: () => {
      queryClient.invalidateQueries("authors");
    },
  });
};
