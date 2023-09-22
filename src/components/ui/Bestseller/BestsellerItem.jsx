import { Star } from "lucide-react";
import React from "react";

const BestsellerItem = (props) => {
  const filledStars = [];
  const emptyStars = [];

  for (let index = 0; index < props.books.rating; index++) {
    filledStars.push(
      <Star key={index} color="#f65d4e" fill="#f65d4e" size={"14px"} />,
    );
  }

  for (let index = 0; index < 5 - props.books.rating; index++) {
    emptyStars.push(<Star key={index} color="#f65d4e" size={"14px"} />);
  }

  return (
    <div className="flex flex-col items-start justify-start bg-white px-6 text-center">
      <div className="w-full rounded-[2rem] min-[300px]:h-[44rem] minw-sm:h-[44rem] minw-md:h-[32rem] minw-1000:h-[40rem]">
        <img
          src={`https://localhost:7047/assets/images/books/${props.books.mainImage}`}
          className="h-full w-full cursor-pointer rounded-[2rem] object-cover"
          alt="book cover"
        />
      </div>
      <p className="mb-4 cursor-pointer pt-8 hover:text-primaryText">
        {props.books.title}
      </p>
      <div className="mb-4 flex">
        {filledStars}
        {emptyStars}
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
