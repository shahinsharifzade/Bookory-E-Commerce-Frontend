import React from "react";
import { User2, Heart, ShoppingBasket } from "lucide-react";
import axios from "axios";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import Cookies from "js-cookie";

const fetchWishList = async () => {
  const response = await axios.get(`https://localhost:7047/api/Wishlist`);
  return response.data;
};

const fetchBasket = async () => {
  var response = await axios.get(`https://localhost:7047/api/Baskets`);
  console.log(
    "🚀 ~ file: HeaderIcons.jsx:15 ~ fetchBasket ~ response:",
    response,
  );
  return response.data;
};

const addBasket = async ({ Id, Quantity }) => {
  const url = `https://localhost:7047/api/Baskets/add`;
  const params = { Id, Quantity };
  try {
    const response = await axios.post(url, null, {
      params,
      withCredentials: true,
    });
    console.log(response.headers);
    console.log(response);
    console.log(response.headers["set-cookie"]);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const HeaderIcons = () => {
  const {
    data: wishlist,
    isLoading: wishlistIsLoading,
    isError: wishlistIsError,
  } = useQuery({ queryKey: ["wishlist"], queryFn: fetchWishList });

  const {
    data: basket,
    isLoading: basketIsLoading,
    isError: basketIsError,
  } = useQuery({ queryKey: ["basket"], queryFn: fetchBasket });

  const { mutate, isLoading, isError, error, data } = useMutation({
    mutationFn: addBasket,
    onSuccess: async () => {
      console.log("I'm first!");
    },
  });

  const handleClick = () => {
    mutate({ Id: "a92af5f8-43fd-441e-e274-08dbb93d82fb", Quantity: 9 });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (basketIsLoading) return <LoadingSpinner isLoading={basketIsLoading} />;

  if (wishlistIsLoading)
    return <LoadingSpinner isLoading={wishlistIsLoading} />;

  if (basketIsError || wishlistIsError) return <div>Error fetching data</div>;

  return (
    <div className="flex items-center font-normal">
      <a className="cursor-pointer border-r border-solid border-secondaryText text-black">
        <User2
          size={"2rem"}
          strokeWidth={"1.2px"}
          className="ml-2 mr-2 font-normal"
        />
      </a>
      <a className="relative cursor-pointer border-r border-solid border-secondaryText text-black">
        <Heart
          size={"2rem"}
          strokeWidth={"1.2px"}
          className="mx-4 font-normal"
        />
        <span className="absolute right-2 top-[-6px] flex max-h-[11px] items-center rounded-md bg-primaryText px-[3px] text-[10px] font-semibold text-white">
          {wishlist.books.length}
        </span>
      </a>
      <a className="relative cursor-pointer text-black">
        <ShoppingBasket
          size={"2rem"}
          strokeWidth={"1.2px"}
          className="ml-2 mr-2 font-normal"
        />
        <span className="absolute right-0 top-[-6px] flex max-h-[11px] items-center rounded-md bg-primaryText px-[3px] text-[10px] font-semibold text-white">
          {basket.length}
        </span>
      </a>

      <button onClick={handleClick}>SUBMIT</button>
    </div>
  );
};

export default HeaderIcons;
