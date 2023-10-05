import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  showToastInfoMessage,
  showToastSuccessMessage,
} from "../utils/toastUtils";
import axios from "axios";

const addToWishlist = async (Id) => {
  const params = { Id };
  const response = await axios.post(
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

const CheckItemExists = async (Id) => {
  const response = await axios.get(
    `https://localhost:7047/api/Wishlist/${Id}`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const useCheckItemExists = (id) => {
  return useQuery({
    queryKey: ["wishlistitem"],
    queryFn: () => CheckItemExists(id),
    retry: false,
  });
};

const DeleteItem = async (Id) => {
  const response = await axios.delete(
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
