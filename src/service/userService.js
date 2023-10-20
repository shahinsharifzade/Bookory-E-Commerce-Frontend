import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api";

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const register = async (body) => {
  console.log("🚀 ~ file: userService.js:6 ~ register ~ body:", body);
  const response = await authApi.post("/users", body);

  return response.data;
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/");
    },
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getActiveUser = async () => {
  const response = await authApi.get("Users/active");

  return response.data;
};

export const useGetActiveUser = () => {
  return useQuery({
    queryKey: ["activeuser"],
    queryFn: getActiveUser,
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getAllUsers = async () => {
  const response = await authApi.get("users");

  return response.data;
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getById = async (id) => {
  const response = await authApi.get(`users/${id}`);

  return response.data;
};

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getById(id),
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
