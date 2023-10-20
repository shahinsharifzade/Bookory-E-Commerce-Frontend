import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  showToastInfoMessage,
  showToastSuccessMessage,
} from "../utils/toastUtils";
import { api, authApi } from "../api";

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getCategories = async () => {
  const response = await api.get("categories");

  return response.data;
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getById = async (id) => {
  const response = await api.get(`categories/${id}`);

  return response.data;
};

export const useGetCategoryById = (id) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getById(id),
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const deleteCategory = async (id) => {
  const response = await authApi.delete(`categories/${id}`);

  return response.data;
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      showToastSuccessMessage("Category successfully deleted");
      queryClient.invalidateQueries("categories");
    },
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const addCategory = async (data) => {
  const response = await authApi.post("categories", data);

  return response.data;
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      showToastSuccessMessage("Category successfully added");
      queryClient.invalidateQueries("categories");
    },
  });
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const putCategory = async (data) => {
  const response = await authApi.put("categories", data);

  return response.data;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putCategory,
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
