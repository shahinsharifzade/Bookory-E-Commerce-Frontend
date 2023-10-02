import React from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import {
  showToastInfoMessage,
  showToastSuccessMessage,
} from "../../../utils/toastUtils";

const addToWishlist = async ({ Id }) => {
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

const AddToWishlist = ({ book }) => {
  const { mutate: wishlistMutate } = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      showToastSuccessMessage("Item added ✅");
    },
    onError: (error) => {
      showToastInfoMessage(`${error.response.data.message}`);
    },
  });

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    wishlistMutate({ Id: book.id });
  };

  return (
    <>
      <div className="pl-8">
        <form onSubmit={handleAddToWishlist}>
          <button type="submit" className="flex items-end">
            <div className="rounded-full border border-solid border-secondaryText active:scale-95 active:shadow-lg">
              <Heart className="m-4" color="#e6e6e6" size={"30px"} />
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default AddToWishlist;
