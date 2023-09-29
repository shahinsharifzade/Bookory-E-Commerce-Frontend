import React, { useState } from "react";
import { User2, Heart, ShoppingBasket } from "lucide-react";
import axios from "axios";
import { useMutation, QueryClient, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
const queryClient = new QueryClient();

const fetchWishList = async () => {
  const response = await axios.get(`https://localhost:7047/api/Wishlist`, {
    withCredentials: true,
  });
  console.log(
    "🚀 ~ file: HeaderIcons.jsx:13 ~ fetchWishList ~ data:",
    response.data,
  );
  return response.data;
};

const fetchBasket = async () => {
  const response = await axios.get(`https://localhost:7047/api/Baskets`, {
    withCredentials: true,
  });
  return response.data;
};

// const addBasket = async ({ Id, Quantity }) => {
//   const url = `https://localhost:7047/api/Baskets/add`;
//   const params = { Id, Quantity };
//   try {
//     const response = await axios.post(url, null, {
//       params,
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response.data.message);
//   }
// };

const HeaderIcons = () => {
  const [basketCount, setBasketCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const {
    data: wishlist,
    isLoading: wishlistIsLoading,
    isError: wishlistIsError,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishList,
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
    onSuccess: (data) => {
      setBasketCount(data.length);
    },
  });

  // const { mutate, isLoading, isError, error } = useMutation({
  //   mutationFn: addBasket,
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries(["basket"]);
  //     const updatedBasket = await fetchBasket();
  //     setBasketCount(updatedBasket.length);
  //   },
  // });

  // const handleClick = () => {
  //   mutate({ Id: "14deddfb-c802-4ffe-db22-08dbb3cffbdc", Quantity: 11 });
  // };

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
          {wishlistCount}
        </span>
      </a>
      <a className="relative cursor-pointer text-black">
        <ShoppingBasket
          size={"2rem"}
          strokeWidth={"1.2px"}
          className="ml-2 mr-2 font-normal"
        />
        <span className="absolute right-0 top-[-6px] flex max-h-[11px] items-center rounded-md bg-primaryText px-[3px] text-[10px] font-semibold text-white">
          {basketCount}
        </span>
      </a>

      {/* <button onClick={handleClick}>SUBMIT</button> */}
    </div>
  );
};

export default HeaderIcons;
