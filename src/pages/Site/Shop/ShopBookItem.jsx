import React, { useState } from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const ShopBookItem = (props) => {
  const filledStars = [];
  const emptyStars = [];

  for (let index = 0; index < props.book.rating; index++) {
    filledStars.push(
      <Star key={index} color="#f65d4e" fill="#f65d4e" size={"14px"} />,
    );
  }
  for (let index = 0; index < 5 - props.book.rating; index++) {
    emptyStars.push(<Star key={index} color="#f65d4e" size={"14px"} />);
  }

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex w-[50%] flex-col items-start justify-start rounded-[2rem] p-12 text-center min-[800px]:w-1/3 min-[1080px]:w-1/4 min-[1360px]:w-1/5 "
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <Link to={`/shop/${props.book.id}`}>
        <div className="relative w-full shrink-0 rounded-[2rem] minw-md:w-[24rem] min-[1200px]:w-[23rem]">
          <img
            src={`https://localhost:7047/assets/images/books/${props.book.mainImage}`}
            className="aspect-[2.4/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
            alt="book cover"
          />

          <div
            className={`absolute bottom-4 right-4 flex flex-col ${
              isHovered ? " block" : "hidden"
            } `}
          >
            <div>
              <a
                className="animate__fadeInRight animate__animated animate__faster ease transform rounded-full bg-white p-2 transition-all duration-300 hover:bg-primaryText "
                href="#"
              >
                <Heart color="#000000" strokeWidth={"1px"} />
              </a>
            </div>

            <div>
              <a
                className="animate__fadeInRight animate__animated ease transform rounded-full  bg-white p-2 transition-all duration-300 hover:bg-primaryText"
                href="#"
              >
                <ShoppingCart color="#000000" strokeWidth={"1px"} />
              </a>
            </div>
          </div>
        </div>

        <div className={`flex flex-col items-start`}>
          <p className="mb-4 line-clamp-1 cursor-pointer overflow-hidden text-ellipsis  pt-8 tracking-widest  hover:text-primaryText minw-xsm:text-2xl">
            {props.book.title}
          </p>

          <div className="mb-4 flex">
            {filledStars}
            {emptyStars}
          </div>

          <p className="mb-4 cursor-pointer text-lg font-semibold tracking-widest text-secondaryText hover:text-primaryText ">
            {props.book.author.name}
          </p>

          <span className="text-[2rem] tracking-widest text-primaryText">
            ${props.book.price}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ShopBookItem;
