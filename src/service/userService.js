import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api";
import { showToastSuccessMessage } from "../utils/toastUtils";

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const register = async (body) => {
  const response = await authApi.post("/users", body);

  return response.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getActiveUser = async () => {
  const response = await authApi.get("Users/active");
  console.log(response);
  return response.data;
};

export const useGetActiveUser = () => {
  return useQuery({
    queryKey: ["activeuser"],
    queryFn: getActiveUser,
    retry: false,
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
    queryKey: ["user", id],
    queryFn: () => getById(id),
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const changeActiveStatus = async (id) => {
  const response = await authApi.put(`users/changeActiveStatus/${id}`);

  return response.data;
};

export const useChangeActiveStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeActiveStatus,
    onSuccess: () => {
      showToastSuccessMessage(
        "User's active state has been successfully modified",
      );
      queryClient.invalidateQueries("users");
    },
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getAllRoles = async () => {
  const response = await authApi.get("roles");

  return response.data;
};

export const useGetAllRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => getAllRoles(),
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const changeRole = async ({ userId, roleId }) => {
  const params = { userId, roleId };
  const response = await authApi.put(`users/changerole`, null, {
    params: params,
  });

  return response.data;
};

export const useChangeRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId, roleId) => changeRole(userId, roleId),
    onSuccess: () => {
      showToastSuccessMessage("The user's role was successfully modified");
      queryClient.invalidateQueries("users");
    },
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
