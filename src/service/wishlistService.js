import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  showToastInfoMessage,
  showToastSuccessMessage,
} from "../utils/toastUtils";
import { authApi } from "../api";

const addToWishlist = async (Id) => {
  const params = { Id };
  const response = await authApi.post(
    `https://localhost:7047/api/Wishlist`,
    null,
    {
      params,
      withCredentials: true,
    },
  );
  return response.data;
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => addToWishlist(id),
    onSuccess: () => {
      showToastSuccessMessage("Item added ✅");
      queryClient.invalidateQueries(["wishlist"]);
    },
  });
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const CheckItemExists = async (Id) => {
  const response = await authApi.get(
    `https://localhost:7047/api/Wishlist/${Id}`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const useCheckItemExists = (id) => {
  return useQuery({
    queryKey: ["wishlistitem", id],
    queryFn: () => CheckItemExists(id),
    retry: false,
    onError: (error) => console.log(error.response.data.message),
    onSuccess: () => console.log("Wishlist Item found with id : " + id),
  });
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const DeleteItem = async (Id) => {
  const response = await authApi.delete(
    `https://localhost:7047/api/Wishlist/${Id}`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => DeleteItem(id),
    onSuccess: () => {
      showToastInfoMessage("Item Remove from wishlist");
      queryClient.invalidateQueries(["wishlist"]);
    },
  });
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getWishlsit = async () => {
  const response = await authApi.get("Wishlist", {
    withCredentials: true,
  });
  console.log(
    "🚀 ~ file: wishlistService.js:92 ~ getWishlsit ~ response:",
    response.data,
  );

  return response.data;
};

export const useGetWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlsit(),
    retry: false,
  });
};

//#region Another way

// export const useAddToWishlist = (id) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: () => addToWishlist({ Id: id }),
//     onSuccess: () => {
//       showToastSuccessMessage("Item added ✅");
//     },
//     onError: () => {
//       showToastInfoMessage("The item already exists in the wishlist");
//     },
//   });
// };

// const { mutate, isLoading } = useAddToWishlist(book.id);

//#endregion
