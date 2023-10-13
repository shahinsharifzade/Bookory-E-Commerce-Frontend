import React, { useState } from "react";
import { User2, Heart, ShoppingBasket } from "lucide-react";
import axios from "axios";
import { QueryClient, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { Link } from "react-router-dom";
import { authApi, usePrivateApi } from "../../../api";
const queryClient = new QueryClient();

const HeaderIcons = () => {
  const [basketCount, setBasketCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const authApi = usePrivateApi(); // Use the hook to get the customized api instance with token

  const fetchWishList = async () => {
    const response = await authApi.get(`Wishlist`, {
      withCredentials: true,
    });

    return response.data;
  };

  const fetchBasket = async () => {
    const response = await authApi.get(`Baskets`, {
      withCredentials: true,
    });
    return response.data;
  };

  const {
    data: wishlist,
    isLoading: wishlistIsLoading,
    isError: wishlistIsError,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishList,
    retry: false,
    onSuccess: (data) => {
      setWishlistCount(data.books.length);
    },
  });

  const {
    data: basket,
    isLoading: basketIsLoading,
    isError: basketIsError,
  } = useQuery({
    queryKey: ["basket"],
    queryFn: fetchBasket,
    retry: false,
    onSuccess: (data) => {
      setBasketCount(data.length);
    },
  });

  if (basketIsLoading) return <LoadingSpinner isLoading={basketIsLoading} />;

  if (wishlistIsLoading)
    return <LoadingSpinner isLoading={wishlistIsLoading} />;

  return (
    <div className="flex items-center font-normal">
      <Link
        to={"login"}
        className="cursor-pointer border-r border-solid border-secondaryText text-black"
      >
        <User2
          size={"2rem"}
          strokeWidth={"1.2px"}
          className="ml-2 mr-2 font-normal"
        />
      </Link>
      <Link
        to={"wishlist"}
        className="relative cursor-pointer border-r border-solid border-secondaryText text-black"
      >
        <Heart
          size={"2rem"}
          strokeWidth={"1.2px"}
          className="mx-4 font-normal"
        />
        <span className="absolute right-2 top-[-6px] flex max-h-[11px] items-center rounded-md bg-primaryText px-[3px] text-[10px] font-semibold text-white">
          {wishlistCount}
        </span>
      </Link>

      <Link to={"cart"} className="relative cursor-pointer text-black">
        <ShoppingBasket
          size={"2rem"}
          strokeWidth={"1.2px"}
          className="ml-2 mr-2 font-normal"
        />
        <span className="absolute right-0 top-[-6px] flex max-h-[11px] items-center rounded-md bg-primaryText px-[3px] text-[10px] font-semibold text-white">
          {basketCount}
        </span>
      </Link>
    </div>
  );
};

export default HeaderIcons;
