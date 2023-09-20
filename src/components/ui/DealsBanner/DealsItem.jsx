import React from "react";
import { Star } from "lucide-react";

const DealsItem = (props) => {
  return (
    <div className="flex items-start justify-start bg-white px-6 py-6 text-center minw-md:w-[33rem]">
      <div className="mr-12 h-[18rem] w-full max-w-[13rem]">
        <img
          src={`https://localhost:7047/assets/images/books/${props.books.mainImage}`}
          className="h-full w-full cursor-pointer rounded-[2rem] object-cover"
          alt="book cover"
        />
      </div>
      <div className="flex flex-col items-start justify-start ">
        <p className="mb-4 cursor-pointer pt-8 hover:text-primaryText">
          {props.books.title}
        </p>
        <div className="mb-4 flex">
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
          <span className="pl-4">6</span>
        </div>
        <p className="mb-4 cursor-pointer text-lg font-semibold tracking-widest text-secondaryText hover:text-primaryText">
          {props.books.author.name}
        </p>
        <span className="text-[2rem] tracking-widest text-primaryText">
          ${props.books.price}
        </span>
      </div>
    </div>
  );
};

export default DealsItem;
