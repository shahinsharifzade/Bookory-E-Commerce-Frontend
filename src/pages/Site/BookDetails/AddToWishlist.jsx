import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import {
  useAddToWishlist,
  useCheckItemExists,
  useDeleteItem,
} from "../../../service/wishlistService";

const AddToWishlist = ({ book }) => {
  const { data, isLoading: bookIsLoading } = useCheckItemExists(book.id);
  const { mutate: addMutate, isLoading } = useAddToWishlist();
  const { mutate: deleteMutate, isLoading: removeItemIsLoading } =
    useDeleteItem();

  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (!isLoading && !bookIsLoading && !removeItemIsLoading && data) {
      setIsInWishlist(data.statusCode === 200);
    }
  }, [data, isLoading, bookIsLoading, removeItemIsLoading]);

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    if (isInWishlist) {
      deleteMutate(book.id);
    } else {
      addMutate(book.id);
    }
    setIsInWishlist(!isInWishlist);
  };

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  if (bookIsLoading) return <LoadingSpinner isLoading={bookIsLoading} />;
  if (removeItemIsLoading)
    return <LoadingSpinner isLoading={removeItemIsLoading} />;

  return (
    <>
      <div className="pl-8">
        <form onSubmit={handleAddToWishlist}>
          <button type="submit" className="flex items-end">
            <div className="rounded-full border border-solid border-secondaryText active:scale-95 active:shadow-lg">
              <Heart
                className="m-4"
                fill={isInWishlist ? "#f65d4e" : "#fff"}
                color="#e6e6e6"
                size={"30px"}
              />
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default AddToWishlist;
