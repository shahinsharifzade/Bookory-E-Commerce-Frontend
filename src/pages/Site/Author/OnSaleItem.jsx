import Rating from "../../../components/ui/Rating/Rating";
import { Link } from "react-router-dom";
import React from "react";
import DiscountPercentage from "../../../components/ui/DiscountPercentage/DiscountPercentage";
import BookPrice from "../../../components/ui/Book/BookPrice";

const OnSaleItem = (props) => {
  return (
    <Link
      to={`/shop/${props.books.id}`}
      className="flex flex-col items-start justify-start bg-white px-6 text-center"
    >
      <div className="w-full rounded-[2rem] minw-md:w-[180px]">
        <img
          src={`${process.env.REACT_APP_BASE_URL}/assets/images/books/${props.books.mainImage}`}
          className="aspect-[1/1.4] h-full w-full cursor-pointer rounded-[2rem] object-cover"
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
      <p className="mb-4 line-clamp-1 cursor-pointer overflow-hidden text-left text-lg font-normal tracking-widest text-secondartTextBold hover:text-primaryText">
        {props.books.author.name}
      </p>

      <BookPrice
        book={props.books}
        discountPriceClasses={"text-[1.6rem]"}
        priceClasses={"text-[2rem]"}
      />
    </Link>
  );
};

export default OnSaleItem;
