import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  showToastInfoMessage,
  showToastSuccessMessage,
} from "../utils/toastUtils";

const addToCart = async ({ Id, Quantity }) => {
  const params = { Id, Quantity };
  const response = await axios.post(
    `https://localhost:7047/api/Baskets/add`,
    null,
    {
      params,
      withCredentials: true,
    },
  );
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
