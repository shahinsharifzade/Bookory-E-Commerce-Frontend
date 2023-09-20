import { Star } from "lucide-react";
import React from "react";

const BestsellerItem = (props) => {
  return (
    <div className="flex flex-col items-start justify-start bg-white  text-center">
      <div className="w-full rounded-[2rem] minw-xsm:h-[44rem] minw-sm:h-[44rem] minw-md:h-[32rem] minw-1000:h-[40rem]">
        <img
          src={`https://localhost:7047/assets/images/books/${props.books.mainImage}`}
          className="h-full w-full rounded-[2rem] cursor-pointer object-cover"
          alt="book cover"
        />
      </div>
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
  );
};

export default BestsellerItem;
