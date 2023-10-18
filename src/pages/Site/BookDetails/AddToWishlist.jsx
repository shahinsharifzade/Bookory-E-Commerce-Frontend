import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import useWishlistItem from "../../../hooks/useWishlistItem";
import React from "react";
import { Heart } from "lucide-react";

const AddToWishlist = ({ book }) => {
  const {
    isInWishlist,
    handleAddToWishlist,
    bookIsLoading,
    addItemIsLoading,
    removeItemIsLoading,
  } = useWishlistItem(book);

  if (addItemIsLoading || bookIsLoading || removeItemIsLoading)
    return (
      <LoadingSpinner
        isLoading={addItemIsLoading || bookIsLoading || removeItemIsLoading}
      />
    );

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
