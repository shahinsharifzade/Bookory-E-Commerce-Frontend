import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  showToastInfoMessage,
  showToastSuccessMessage,
} from "../utils/toastUtils";
import { api, authApi } from "../api";

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getAllGenres = async () => {
  const response = await api.get("genres");

  return response.data;
};

export const useGetAllGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () => getAllGenres(),
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getById = async (id) => {
  const response = await api.get(`genres/${id}`);

  return response.data;
};

export const useGetGenreById = (id) => {
  return useQuery({
    queryKey: ["genre", id],
    queryFn: () => getById(id),
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const deleteGenre = async (id) => {
  const response = await authApi.delete(`genres/${id}`);

  return response.data;
};

export const useDeleteGenre = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGenre,
    onSuccess: () => {
      showToastSuccessMessage("Genre successfully deleted");
      queryClient.invalidateQueries("genres");
    },
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const addGenre = async (data) => {
  const response = await authApi.post("/genres", data);

  return response.data;
};

export const useAddGenre = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addGenre,
    onSuccess: () => {
      showToastSuccessMessage("Genre successfully added");
      queryClient.invalidateQueries("genres");
    },
  });
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const putGenre = async (data) => {
  const response = await authApi.put("genres", data);

  return response.data;
};

export const useUpdateGenre = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putGenre,
    onSuccess: () => {
      queryClient.invalidateQueries("genres");
    },
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
