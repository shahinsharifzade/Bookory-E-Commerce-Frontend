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
  });
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const postAddress = async (data) => {
  const response = await authApi.post("UserAddress", data);

  return response.data;
};

export const useAddAddress = () => {
  return useMutation({
    mutationFn: postAddress,
  });
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
