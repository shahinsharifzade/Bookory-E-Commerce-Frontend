import React from "react";
import { Star } from "lucide-react";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";

const KeepReadingItem = (props) => {
  return (
    <Link
      to={`/shop/${props.books.id}`}
      className="flex items-start justify-start bg-white px-6 py-6 text-center minw-sm:w-1/2 minw-md:w-[33rem]"
    >
      <div className="mr-12 w-full max-w-[13rem]">
        <img
          src={`https://localhost:7047/assets/images/books/${props.books.mainImage}`}
          className="aspect-[2.2/3] h-full w-full cursor-pointer rounded-[2rem] object-cover"
          alt="book cover"
        />
      </div>

      <div className="flex flex-col items-start justify-start ">
        <p className="mb-4 line-clamp-1 cursor-pointer overflow-hidden  text-ellipsis pt-8 text-left hover:text-primaryText">
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
      </div>
    </Link>
  );
};

export default KeepReadingItem;
