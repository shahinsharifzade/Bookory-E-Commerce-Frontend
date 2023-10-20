import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { api } from "../api";

const getStores = async (pageNumber, pageSize, search, sortBy) => {
  const params = {
    pageNumber,
    pageSize,
    "filters.Search": search,
    "filters.SortBy": sortBy,
  };

  const response = await axios.get(`https://localhost:7047/api/Company/paged`, {
    params: params,
  });
  return response.data;
};

export const useGetFilteredStores = (pageNumber, pageSize, search, sortBy) => {
  return useQuery({
    queryKey: ["company", pageNumber, pageSize, search, sortBy],
    queryFn: () => getStores(pageNumber, pageSize, search, sortBy),
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getAll = async () => {
  var response = await axios.get("https://localhost:7047/api/Company");
  return response.data;
};

export const useGetAll = () => {
  return useQuery({
    queryKey: ["company"],
    queryFn: () => getAll(),
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getById = async (id) => {
  const response = await axios.get(`https://localhost:7047/api/Company/${id}`);

  return response.data;
};

export const useGetById = (id) => {
  return useQuery({
    queryKey: ["company", id],
    queryFn: () => getById(id),
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const postMessage = async (data) => {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }
  var response = await axios.post(
    `https://localhost:7047/api/Company/email`,
    formData,
  );

  return response.data;
};

export const usePostmessage = () => {
  return useMutation({
    mutationFn: (data) => postMessage(data),
    onSuccess: () => {
      console.log("SUCCESS");
    },
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const createCompany = async (data) => {
  data.bannerimage = data.bannerimage[0];
  data.logo = data.logo[0];

  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  const response = await api.post("company", formData);
  return response.data;
};

export const useCreateCompany = () => {
  return useMutation({
    mutationFn: (data) => createCompany(data),
    onSuccess: () => {
      console.log("SUCCESS");
    },
  });
};
