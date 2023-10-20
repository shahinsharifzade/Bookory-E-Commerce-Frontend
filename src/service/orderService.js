import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getAllOrders = async () => {
  const response = await api.get("orderdetail");

  return response.data;
};

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getAllOrders(),
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getById = async (id) => {
  const response = await api.get(`orderdetail/${id}`);

  return response.data;
};

export const useGetOrderById = (id) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => getById(id),
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getByUserId = async (id) => {
  const response = await api.get(`orderdetail/byuserid/${id}`);

  return response.data;
};

export const useGetOrderByUserId = (id) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => getByUserId(id),
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
