import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Qs from "qs";
import { showToastSuccessMessage } from "../utils/toastUtils";
import { api, authApi } from "../api";
import { useNavigate } from "react-router-dom";

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getFilteredBlogs = async (
  pageNumber,
  pageSize,
  categories,
  sortBy,
  search,
) => {
  const params = {
    pageNumber,
    pageSize,
    "filters.Categories": categories,
    "filters.SortBy": sortBy,
    search,
  };

  var response = await api.get("blogs/paged", {
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: "repeat" });
    },
  });

  return response.data;
};

export const useGetFilteredBlogs = (
  pageNumber,
  pageSize,
  categories,
  sortBy,
  search,
) => {
  return useQuery({
    queryKey: ["blogs", pageNumber, pageSize, categories, sortBy, search],
    queryFn: () =>
      getFilteredBlogs(pageNumber, pageSize, categories, sortBy, search),
    retry: false,
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getBlogById = async ({ blogId }) => {
  const response = await api.get(`blogs/${blogId}`);

  return response.data;
};

export const useGetBlogById = (blogId) => {
  return useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => getBlogById(blogId),
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const deleteBlog = async (id) => {
  const response = await authApi.delete(`blogs/${id}`);

  return response.data;
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      showToastSuccessMessage("Blog successfully deleted");
      queryClient.invalidateQueries("blogs");
    },
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const addBlog = async (data) => {
  const formData = new FormData();
  console.log("🚀 ~ file: blogService.js:87 ~ addBlog ~ data:", data);

  for (const key in data) {
    console.log(data[key]);

    if (data[key] instanceof FileList)
      Array.from(data[key]).forEach((image) => formData.append(key, image));
    else formData.append(key, data[key]);
  }

  const response = await authApi.post("blogs", formData);

  return response.data;
};

export const useAddBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => addBlog(data),
    onSuccess: () => {
      showToastSuccessMessage("Blogs successfully added");
      queryClient.invalidateQueries("blogs");
    },
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
