import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import BookPrice from "../Book/BookPrice";

const DealsItem = ({ book }) => {
  return (
    <Link
      to={`/shop/${book.id}`}
      className="flex items-start justify-start bg-white px-6 py-6 text-center minw-md:w-[33rem]"
    >
      <div className="mr-12 h-[18rem] w-full max-w-[13rem]">
        <img
          src={`https://localhost:7047/assets/images/books/${book.mainImage}`}
          className="h-full w-full cursor-pointer rounded-[2rem] object-cover"
          alt="book cover"
        />
      </div>
      <div className="flex flex-col items-start justify-start ">
        <p className="mb-4 line-clamp-1 cursor-pointer overflow-hidden  text-ellipsis pt-8 text-left hover:text-primaryText">
          {book.title}
        </p>
        <div className="mb-4 flex">
          <Rating rating={book.rating} />
        </div>

        <p className="mb-4 cursor-pointer text-left text-lg font-normal tracking-widest text-secondartTextBold hover:text-primaryText">
          {book.author.name}
        </p>

        <BookPrice
          book={book}
          discountPriceClasses={"text-[1.6rem]"}
          priceClasses={"text-[2rem]"}
        />
      </div>
    </Link>
  );
};

export default DealsItem;
