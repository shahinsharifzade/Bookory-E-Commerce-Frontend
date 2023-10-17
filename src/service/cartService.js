import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  showToastInfoMessage,
  showToastSuccessMessage,
} from "../utils/toastUtils";
import { authApi } from "../api";

const getCartItems = async () => {
  const response = await authApi.get("Baskets", {
    withCredentials: true,
  });

  return response.data;
};

export const useGetBasketItems = () => {
  return useQuery({
    queryKey: ["basket"],
    queryFn: getCartItems,
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const addToCart = async ({ Id, Quantity }) => {
  const params = { Id, Quantity };
  const response = await authApi.post(`Baskets/add`, null, {
    params,
    withCredentials: true,
  });
  return response.data;
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id, basketCount) => addToCart(id, basketCount),
    onSuccess: () => {
      showToastSuccessMessage("Item added ✅");
      queryClient.invalidateQueries(["basket"]);
    },
    onError: () => {
      showToastInfoMessage("Something is wrong");
    },
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const updateCartItem = async ({ Id, Quantity }) => {
  const data = { Id, Quantity };
  const response = await authApi.put("baskets/update", data, {
    withCredentials: true,
  });

  return response.data;
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id, quantity) => updateCartItem(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries(["basket"]);
    },
    onError: () => {
      showToastInfoMessage("Something is wrong");
    },
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const deleteCartItem = async (id) => {
  const response = await authApi.delete(`baskets/delete/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteCartItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["basket"]);
    },
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
