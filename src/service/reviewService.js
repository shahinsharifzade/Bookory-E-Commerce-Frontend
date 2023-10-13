import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api";

const postReview = async (data) => {
  var response = await authApi.post(`comment/create`, data);

  return response;
};

export const usePostReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
      queryClient.invalidateQueries("user");
    },
  });
};

//--------------------------------------------------------------------------
