import React from "react";
import { Star } from "lucide-react";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";
import BookPrice from "../Book/BookPrice";
import DiscountPercentage from "../DiscountPercentage/DiscountPercentage";

const KeepReadingItem = ({ book }) => {
  return (
    <Link
      to={`/shop/${book.id}`}
      className="flex items-start justify-start bg-white px-6 py-6 text-center minw-sm:w-1/2 minw-md:w-[33rem]"
    >
      <div className="relative mr-12 w-full max-w-[13rem]">
        <img
          src={`${process.env.REACT_APP_BASE_URL}/assets/images/books/${book.mainImage}`}
          className="aspect-[2.2/3] h-full w-full cursor-pointer rounded-[2rem] object-cover"
          alt="book cover"
        />

        <DiscountPercentage discountPercentage={book.discountPercentage} />
      </div>

      <div className="flex flex-col items-start justify-start ">
        <p className="mb-4 line-clamp-1 cursor-pointer overflow-hidden text-ellipsis pt-8 text-left hover:text-primaryText">
          {book.title}
        </p>

        <div className="mb-4 flex">
          <Rating rating={book.rating} />
        </div>

        <p className="mb-4 line-clamp-1 cursor-pointer overflow-hidden text-left text-lg font-normal tracking-widest text-secondartTextBold hover:text-primaryText">
          {book.author.name}
        </p>

        <BookPrice
          book={book}
          discountPriceClasses={"text-[1.4rem]"}
          priceClasses={"text-[1.8rem]"}
        />
      </div>
    </Link>
  );
};

export default KeepReadingItem;
