import React from "react";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";
import DiscountPercentage from "../DiscountPercentage/DiscountPercentage";
import BookPrice from "../Book/BookPrice";

const BestsellerItem = ({ book }) => {
  return (
    <Link
      to={`/shop/${book.id}`}
      className="flex flex-col items-start justify-start bg-white px-6 text-center"
    >
      <div className="relative w-full rounded-[2rem] min-[300px]:h-[44rem] minw-sm:h-[44rem] minw-md:h-[32rem] minw-1000:h-[40rem]">
        <img
          src={`${process.env.REACT_APP_IMR_SRC}/assets/images/books/${book.mainImage}`}
          className="h-full w-full cursor-pointer rounded-[2rem] object-cover"
          alt="book cover"
        />

        <DiscountPercentage discountPercentage={book.discountPercentage} />
      </div>

      <p className="mb-4 cursor-pointer pt-8 hover:text-primaryText">
        {book.title}
      </p>

      <div className="mb-4 flex">
        <Rating rating={book.rating} />
      </div>

      <p className="mb-4 cursor-pointer text-lg font-normal tracking-widest text-secondartTextBold hover:text-primaryText">
        {book.author.name}
      </p>

      <BookPrice
        book={book}
        discountPriceClasses={"text-[1.6rem]"}
        priceClasses={"text-[2rem]"}
      />
    </Link>
  );
};

export default BestsellerItem;
