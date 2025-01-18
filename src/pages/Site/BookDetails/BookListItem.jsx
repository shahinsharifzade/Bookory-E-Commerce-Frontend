import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import Rating from "../../../components/ui/Rating/Rating";
import BookPrice from "../../../components/ui/Book/BookPrice";

const BookListItem = ({ book }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex w-[50%] flex-col items-start justify-start rounded-[2rem] p-12 text-center minw-md:w-[33%]  min-[1200px]:w-[20%] min-[1360px]:w-1/6 "
      onMouseEnter={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
    >
      <div className="relative w-full shrink-0 rounded-[2rem] minw-md:w-[24rem] min-[1200px]:w-[18rem]">
        <img
          src={`${process.env.REACT_APP_IMR_SRC}/assets/images/books/${book.mainImage}`}
          className="aspect-[2.2/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
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
        <p className="mb-4 line-clamp-1 cursor-pointer overflow-hidden text-ellipsis pt-8 text-left tracking-widest hover:text-primaryText minw-xsm:text-[1.8rem]">
          {book.title}
        </p>

        <div className="mb-4 flex">
          <Rating rating={book.rating} />
        </div>

        <p className="mb-4 cursor-pointer text-lg font-normal tracking-widest text-secondartTextBold hover:text-primaryText ">
          {book.author.name}
        </p>

        <BookPrice
          book={book}
          discountPriceClasses={"text-[1.6rem]"}
          priceClasses={"text-[2rem]"}
        />
      </div>
    </div>
  );
};

export default BookListItem;
