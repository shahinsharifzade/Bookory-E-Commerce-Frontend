import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

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
