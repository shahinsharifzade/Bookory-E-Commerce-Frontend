import React from "react";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";
import DiscountPercentage from "../DiscountPercentage/DiscountPercentage";
import BookPrice from "../Book/BookPrice";

const TrendItem = ({ book }) => {
  return (
    <Link
      to={`/shop/${book.id}`}
      className="flex flex-col items-start justify-start rounded-[2rem] bg-[#F4FBF2] p-12 text-center minw-xsm:flex-row"
    >
      <div className="relative h-full w-full shrink-0 rounded-[2rem] minw-xsm:w-[18rem]">
        <img
          src={`${process.env.REACT_APP_IMR_SRC}/assets/images/books/${book.mainImage}`}
          className="aspect-[2.2/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
          alt="book cover"
        />

        <DiscountPercentage discountPercentage={book.discountPercentage} />
      </div>

      <div className="flex h-full flex-col items-start minw-xsm:pl-12">
        <p className="mb-4 line-clamp-1 cursor-pointer overflow-hidden text-ellipsis pt-8 text-left tracking-widest hover:text-primaryText minw-xsm:text-[2rem]">
          {book.title}
        </p>

        <div className="mb-4 flex">
          <Rating rating={book.rating} />
        </div>

        <p className="mb-4 cursor-pointer text-lg font-normal tracking-widest text-[#444444] hover:text-primaryText">
          {book.author.name}
        </p>

        <p className="mb-4 line-clamp-3 max-w-fit cursor-pointer overflow-hidden text-ellipsis text-start text-lg font-normal tracking-widest text-[#444444] hover:text-primaryText">
          {book.description}
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

export default TrendItem;
