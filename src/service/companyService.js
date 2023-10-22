import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { api, authApi } from "../api";
import {
  showToastInfoMessage,
  showToastSuccessMessage,
} from "../utils/toastUtils";
import { useNavigate } from "react-router-dom";

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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
    queryKey: ["companies", pageNumber, pageSize, search, sortBy],
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
    queryKey: ["companies"],
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
      console.log("SUCCESS");
    },
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const updateCompany = async (data) => {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  const response = await authApi.put("company", formData);
  return response.data;
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
      showToastSuccessMessage("Company successfully updated");
    },
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getPendingOrRejectedCompanies = async () => {
  var response = await authApi.get("company/pending-or-rejected");

  return response.data;
};

export const useGetPendingOrRejectedCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: () => getPendingOrRejectedCompanies(),
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const approveCompany = async (id) => {
  var response = await authApi.post(`Company/${id}/approve`);

  return response;
};

export const useApproveCompany = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id) => approveCompany(id),
    onSuccess: () => {
      showToastSuccessMessage("Company approved");
      queryClient.invalidateQueries(["companies"]);
      navigate("/admin/stores");
    },
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const rejectCompany = async (id) => {
  var response = await authApi.post(`Company/${id}/reject`);

  return response;
};

export const useRejectCompany = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id) => rejectCompany(id),
    onSuccess: () => {
      showToastInfoMessage("Company rejeceted");
      queryClient.invalidateQueries(["companies"]);
      navigate("/admin/stores");
    },
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getByUsername = async (username) => {
  const response = await authApi.get(`Company/byusername`, {
    params: {
      userName: username,
    },
  });

  return response.data;
};

export const useGetByUsername = (username) => {
  return useQuery({
    queryKey: ["company", username],
    queryFn: () => getByUsername(username),
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getByActiveVendor = async () => {
  const response = await authApi.get(`Company/byactive`);

  return response.data;
};

export const useGetByActiveVendor = () => {
  return useQuery({
    queryKey: ["company"],
    queryFn: getByActiveVendor,
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
