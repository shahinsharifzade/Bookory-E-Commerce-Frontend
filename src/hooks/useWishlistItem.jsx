import { useEffect, useState } from "react";
import {
  useAddToWishlist,
  useCheckItemExists,
  useDeleteItem,
} from "../service/wishlistService";

const useWishlistItem = (book) => {
  const { data, isLoading: bookIsLoading } = useCheckItemExists(book.id);
  const { mutate: addMutate, isLoading: addItemIsLoading } = useAddToWishlist();
  const { mutate: deleteMutate, isLoading: removeItemIsLoading } =
    useDeleteItem();

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [existItem, setExistItem] = useState();

  useEffect(() => {
    if (!addItemIsLoading && !removeItemIsLoading) {
      setIsInWishlist(existItem);
    }
  }, [addItemIsLoading, removeItemIsLoading, existItem]);

  useEffect(() => {
    if (!bookIsLoading && data) setExistItem(data.statusCode === 200);
  }, [bookIsLoading, data]);

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    if (isInWishlist) {
      deleteMutate(book.id);
    } else {
      addMutate(book.id);
    }
    setIsInWishlist(!isInWishlist);
    setExistItem(!existItem);
  };

  return {
    isInWishlist,
    handleAddToWishlist,
    bookIsLoading,
    addItemIsLoading,
    removeItemIsLoading,
  };
};

export default useWishlistItem;
