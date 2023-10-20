import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, authApi } from "../api";
import { showToastSuccessMessage } from "../utils/toastUtils";

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const postMessage = async (data) => {
  const response = await api.post("contact", data);
  console.log(
    "🚀 ~ file: contactService.js:7 ~ postMessage ~ response:",
    response,
  );
  return response.data;
};

export const usePostMessage = () => {
  return useMutation({
    mutationFn: postMessage,
    onSuccess: () => {
      showToastSuccessMessage("Message Sended successfully");
    },
    onError: async (error) => {
      console.log(error.response.data.errors);
    },
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getAllContacts = async () => {
  const response = await authApi.get("contact");

  return response.data;
};

export const useGetAllContacts = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: () => getAllContacts(),
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getById = async (id) => {
  const response = await authApi.get(`contact/${id}`);

  return response.data;
};

export const useGetContactById = (id) => {
  return useQuery({
    queryKey: ["contacts", id],
    queryFn: () => getById(id),
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const deleteContact = async (id) => {
  const response = await authApi.delete(`contact/${id}`);

  return response.data;
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      showToastSuccessMessage("Contact Message successfully deleted");
      queryClient.invalidateQueries("contacts");
    },
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
