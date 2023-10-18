import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api";
import { ClickAwayListener } from "@mui/material";
import { ArrowUpAZ } from "lucide-react";

const getAllAddress = async () => {
  const response = await authApi.get("UserAddress");

  return response.data;
};

export const useGetAllAddress = () => {
  return useQuery({
    queryKey: ["address"],
    queryFn: getAllAddress,
    retry: false,
  });
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const postAddress = async (data) => {
  const response = await authApi.post("UserAddress", data);

  return response.data;
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postAddress,
    onSuccess: () => {
      queryClient.invalidateQueries("address");
    },
  });
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const putAddress = async (data) => {
  const response = await authApi.put("UserAddress/Update", data);
  console.log(
    "🚀 ~ file: addressService.js:38 ~ putAddress ~ response:",
    response,
  );

  return response.data;
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putAddress,
    onSuccess: () => {
      queryClient.invalidateQueries("address");
    },
  });
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const deleteAddress = async (id) => {
  console.log("🚀 ~ file: addressService.js:60 ~ deleteAddress ~ id:", id);
  const response = await authApi.delete(`UserAddress/${id}`);

  return response.data;
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries("address");
    },
  });
};
