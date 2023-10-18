import Rating from "../../../components/ui/Rating/Rating";
import { Link } from "react-router-dom";
import React from "react";

const OnSaleItem = (props) => {
  return (
    <Link
      to={`/shop/${props.books.id}`}
      className="flex flex-col items-start justify-start bg-white px-6 text-center"
    >
      <div className="w-full rounded-[2rem] minw-md:w-[180px]">
        <img
          src={`https://localhost:7047/assets/images/books/${props.books.mainImage}`}
          className="aspect-[1/1.4] h-full w-full cursor-pointer rounded-[2rem] object-cover"
          alt="book cover"
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

export default OnSaleItem;
