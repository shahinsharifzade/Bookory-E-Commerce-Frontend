import React from "react";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";
import DiscountPercentage from "../DiscountPercentage/DiscountPercentage";

const BestsellerItem = (props) => {
  return (
    <Link
      to={`/shop/${props.books.id}`}
      className="flex flex-col items-start justify-start bg-white px-6 text-center"
    >
      <div className="relative w-full rounded-[2rem] min-[300px]:h-[44rem] minw-sm:h-[44rem] minw-md:h-[32rem] minw-1000:h-[40rem]">
        <img
          src={`https://localhost:7047/assets/images/books/${props.books.mainImage}`}
          className="h-full w-full cursor-pointer rounded-[2rem] object-cover"
          alt="book cover"
        />

        <DiscountPercentage
          discountPercentage={props.books.discountPercentage}
        />
      </div>

      <p className="mb-4 cursor-pointer pt-8 hover:text-primaryText">
        {props.books.title}
      </p>

      <div className="mb-4 flex">
        <Rating rating={props.books.rating} />
      </div>

      <p className="mb-4 cursor-pointer text-lg font-semibold tracking-widest text-secondaryText hover:text-primaryText">
        {props.books.author.name}
      </p>

      <span className="text-[2rem] tracking-widest text-primaryText">
        ${props.books.price}
      </span>
    </Link>
  );
};

export default BestsellerItem;
