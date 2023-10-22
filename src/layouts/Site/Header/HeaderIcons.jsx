import React, { useState } from "react";
import { User2, Heart, ShoppingBasket, LogOut } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { Link } from "react-router-dom";
import { usePrivateApi } from "../../../api";
import { useGetActiveUser } from "../../../service/userService";
import Admin from "../../../assets/images/user-gear.png";

const HeaderIcons = () => {
  const [basketCount, setBasketCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const authApi = usePrivateApi();

  const { data: activeUser, isLoading: isActiveUserLoading } =
    useGetActiveUser();

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

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.reload();
  };

  if (wishlistIsLoading || isActiveUserLoading || basketIsLoading)
    return (
      <LoadingSpinner
        isLoading={wishlistIsLoading || isActiveUserLoading || basketIsLoading}
      />
    );

  return (
    <div className="flex items-center font-normal">
      <Link
        to={"login"}
        className={`cursor-pointer border-r border-solid border-secondaryText text-black ${
          activeUser ? "hidden" : ""
        }`}
      >
        <User2
          size={"2.4rem"}
          strokeWidth={"1.2px"}
          className="ml-2 mr-2 font-normal"
        />
      </Link>

      {activeUser && (
        <Link
          to={"/admin"}
          className={`cursor-pointer border-r border-solid border-secondaryText text-black ${
            activeUser.role === "Admin" || activeUser.role === "Moderator"
              ? ""
              : "hidden"
          }`}
        >
          <div className="mx-4 h-[26px] w-[26px]">
            <img src={Admin} className="h-full w-full object-contain" />
          </div>
        </Link>
      )}

      <Link
        to={"wishlist"}
        className="relative cursor-pointer border-r border-solid border-secondaryText text-black"
      >
        <Heart
          size={"2.4rem"}
          strokeWidth={"1.2px"}
          className="mx-4 font-normal"
        />
        <span className="absolute right-2 top-[-6px] flex max-h-[11px] items-center rounded-md bg-primaryText px-[3px] text-[10px] font-semibold text-white">
          {wishlistCount}
        </span>
      </Link>

      <Link to={"cart"} className="relative cursor-pointer text-black">
        <ShoppingBasket
          size={"2.4rem"}
          strokeWidth={"1.2px"}
          className="ml-2 mr-2 font-normal"
        />
        <span className="absolute right-0 top-[-6px] flex max-h-[11px] items-center rounded-md bg-primaryText px-[3px] text-[10px] font-semibold text-white">
          {basketCount}
        </span>
      </Link>

      <div
        className={`${
          activeUser ? "" : "hidden"
        } cursor-pointer border-l border-solid border-secondaryText`}
        onClick={handleLogout}
      >
        <LogOut
          size={"2.4rem"}
          strokeWidth={"1.2px"}
          className="ml-2 mr-2 font-normal"
        />
      </div>
    </div>
  );
};

export default HeaderIcons;
