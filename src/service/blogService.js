import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Qs from "qs";

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

  var response = await axios.get("https://localhost:7047/api/Blog/paged", {
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

const getBlogById = async ({ blogId }) => {
  const response = await axios.get(`https://localhost:7047/api/Blog/${blogId}`);

  return response.data;
};

export const useGetBlogById = (blogId) => {
  return useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => getBlogById(blogId),
  });
};
