import React from "react";
import { Star } from "lucide-react";

const TrendItem = (props) => {
  return (
    <div className="flex flex-col items-start justify-start rounded-[2rem] bg-[#F4FBF2] p-12 text-center minw-xsm:flex-row">
      <div className="w-full shrink-0 rounded-[2rem] minw-xsm:w-[18rem]">
        <img
          src={`https://localhost:7047/assets/images/books/${props.books.mainImage}`}
          className="aspect-[2.2/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
          alt="book cover"
        />
      </div>

      <div className="flex flex-col items-start minw-xsm:pl-12">
        <p className="mb-4 cursor-pointer pt-8 tracking-widest hover:text-primaryText minw-xsm:text-[2rem]">
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
        <p className="mb-4 line-clamp-3 max-w-fit cursor-pointer overflow-hidden text-ellipsis text-start text-lg font-semibold tracking-widest text-secondaryText hover:text-primaryText">
          {props.books.description}
        </p>
        <span className="text-[2rem] tracking-widest text-primaryText">
          ${props.books.price}
        </span>
      </div>
    </div>
  );
};

export default TrendItem;
