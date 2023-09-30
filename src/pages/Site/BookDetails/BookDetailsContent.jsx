import React, { useState } from "react";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { ShoppingBasket } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const addToCart = async ({ Id, Quantity }) => {
  const params = { Id, Quantity };
  const response = await axios.post(
    `https://localhost:7047/api/Baskets/add`,
    null,
    {
      params,
      withCredentials: true,
    },
  );
  return response.data;
};

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

const BookDetailsContent = ({ book }) => {
  const bookRatingStars = [];
  const [basketCount, setBasketCount] = useState(1);

  for (let index = 0; index < 5; index++) {
    if (index < book.rating) {
      bookRatingStars.push(
        <Star key={index} color="#f65d4e" fill="#f65d4e" size={"14px"} />,
      );
    } else {
      bookRatingStars.push(<Star key={index} color="#f65d4e" size={"14px"} />);
    }
  }

  const { mutate } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      console.log("SUCCCESS");
    },
    onError: () => {},
  });

  const { mutate: wishlistMutate } = useMutation({
    mutationFn: addToWishlist,
  });

  const handleAddToCart = (e) => {
    e.preventDefault();
    mutate({ Id: book.id, Quantity: basketCount });
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    wishlistMutate({ Id: book.id });
  };

  return (
    <div>
      <div className="flex">
        <div className="mr-8 w-1/2 rounded-3xl border border-solid border-secondaryText">
          <div className="cursor-pointer p-12">
            <img
              src={`https://localhost:7047/assets/images/books/${book.mainImage}`}
              className="aspect-[2.3/3] h-full w-full rounded-3xl object-cover"
              alt="book cover"
            />
          </div>
        </div>

        <div className="ml-8 w-1/2 rounded-3xl border border-solid border-secondaryText">
          <div className="p-12">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[3.6rem] font-semibold">{book.title}</h3>
              <div>
                {book.stockQuantity !== 0 ? (
                  <div className="rounded-lg bg-[#82d17533] px-4 py-2 text-lg font-light text-[#82d175]">
                    IN STOCK
                  </div>
                ) : (
                  <div className="rounded-lg bg-[#e6393933] px-4 py-2 text-lg font-light text-[#e63939]">
                    OUT OF STOCK
                  </div>
                )}
              </div>
            </div>

            <div className="mb-10 flex items-center border-b border-solid border-secondaryText pb-4">
              <div className="mr-8 border-r border-solid border-secondaryText pr-8 text-lg font-light">
                <span className="text-[#999999]">Author : </span>
                <Link to={`/author/${book.author.id}`}>{book.author.name}</Link>
              </div>
              <div className="flex">{bookRatingStars}</div>
            </div>

            <div className="mb-12">
              <p className="mb-6 text-[2rem] text-primaryText">${book.price}</p>
              <p className="line-clamp-3 overflow-hidden text-ellipsis text-xl font-light text-[#444444]">
                {book.description}
              </p>
            </div>

            <div className="mt-16 flex items-end">
              <div className="relative">
                <p className="text-secondartTextBold absolute top-[-20px] pb-4 text-xl font-light">
                  Quantity
                </p>
                <div className="flex items-center">
                  <div
                    className="h-full cursor-pointer rounded-l-[3rem] border-[1px] border-solid border-secondaryText border-r-transparent px-8 py-6 hover:bg-primaryText hover:text-white"
                    onClick={() => setBasketCount((prev) => prev - 1)}
                  >
                    -
                  </div>
                  <input
                    type="number"
                    min={1}
                    max={999}
                    value={basketCount}
                    onChange={(e) => setBasketCount(parseInt(e.target.value))}
                    className="border-y-[1px] px-4 py-6 text-center
                  !outline-none  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <div
                    className="h-full cursor-pointer rounded-r-[3rem] border-[1px] border-solid border-secondaryText border-l-transparent px-8  py-6 hover:bg-primaryText hover:text-white"
                    onClick={() => setBasketCount((prev) => prev + 1)}
                  >
                    +
                  </div>
                </div>
              </div>

              <div className="ml-8">
                <form onSubmit={handleAddToCart}>
                  <button
                    type="submit"
                    className="flex items-center rounded-[3rem] bg-primaryText px-8 py-6"
                  >
                    <ShoppingBasket color="white" />
                    <p className="pl-4 text-white">Add to cart</p>
                  </button>
                </form>
              </div>

              <div className="pl-8">
                <form onSubmit={handleAddToWishlist}>
                  <button type="submit" className="flex items-end">
                    <div className="rounded-full border border-solid border-secondaryText">
                      <Heart className="m-4 " size={"30px"} />
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsContent;
