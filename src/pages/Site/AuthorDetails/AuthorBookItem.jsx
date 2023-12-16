import React, { useState } from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Rating from "../../../components/ui/Rating/Rating";
import BookPrice from "../../../components/ui/Book/BookPrice";
import { Link } from "react-router-dom";

const AuthorBookItem = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/shop/${props.book.id}`}
      className="flex w-[50%] flex-col items-start justify-start rounded-[2rem] p-12 text-center minw-md:w-[34%] minw-lg:w-[33%] min-[1200px]:w-1/4 "
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div className="relative w-full shrink-0 rounded-[2rem] minw-md:w-[24rem] min-[1200px]:w-[18rem]">
        <img
          src={`https://localhost:7047/assets/images/books/${props.book.mainImage}`}
          className="aspect-[2.2/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
          alt="book cover"
        />

        {/* <div
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
        </div> */}
      </div>

      <div className={`flex flex-col items-start`}>
        <p className="mb-4 line-clamp-1 cursor-pointer  overflow-hidden text-ellipsis pt-8 text-left tracking-widest hover:text-primaryText minw-xsm:text-[1.8rem]">
          {props.book.title}
        </p>

        <div className="mb-4 flex">
          <Rating rating={props.book.rating} />
        </div>

        <p className="mb-4 cursor-pointer text-lg font-normal tracking-widest text-secondartTextBold hover:text-primaryText ">
          {props.book.author.name}
        </p>

        <BookPrice
          book={props.book}
          discountPriceClasses={"text-[1.6rem]"}
          priceClasses={"text-[2rem]"}
        />
      </div>
    </Link>
  );
};

export default AuthorBookItem;
