import React from "react";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";
import { Star } from "lucide-react";
import AddToWishlist from "./AddToWishlist";

const BookDetailsContent = ({ book }) => {
  const bookRatingStars = [];

  for (let index = 0; index < 5; index++) {
    if (index < book.rating) {
      bookRatingStars.push(
        <Star key={index} color="#f65d4e" fill="#f65d4e" size={"14px"} />,
      );
    } else {
      bookRatingStars.push(<Star key={index} color="#f65d4e" size={"14px"} />);
    }
  }

  return (
    <div>
      <div className="flex max-minw-1000:flex-col max-minw-1000:justify-center">
        <div className="mr-8 w-1/2 rounded-3xl border border-solid border-secondaryText max-minw-1000:mx-auto ">
          <div className="cursor-pointer p-12">
            <img
              src={`https://localhost:7047/assets/images/books/${book.mainImage}`}
              className="aspect-[2.3/3] h-full w-full rounded-3xl object-cover"
              alt="book cover"
            />
          </div>
        </div>

        <div className="ml-8 h-min w-1/2 rounded-3xl border border-solid border-secondaryText max-minw-1000:ml-0 max-minw-1000:w-full">
          <div className="p-12">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[3.6rem] font-semibold">{book.title}</h3>
              <div>
                {book.stockQuantity !== 0 ? (
                  <div className="w-max rounded-lg bg-[#82d17533] px-4 py-2 text-lg font-light text-[#82d175]">
                    IN STOCK
                  </div>
                ) : (
                  <div className="w-max rounded-lg bg-[#e6393933] px-4 py-2 text-lg font-light text-[#e63939]">
                    OUT OF STOCK
                  </div>
                )}
              </div>
            </div>

            <div className="mb-10 flex items-center border-b border-solid border-secondaryText pb-4">
              <div className="mr-8 border-r border-solid border-secondaryText pr-8 text-lg font-light">
                <span className="text-secondartTextBold">Author : </span>
                <Link to={`/author/${book.author.id}`}>{book.author.name}</Link>
              </div>
              <div className="flex">{bookRatingStars}</div>
            </div>

            <div className="mb-12 border-b border-solid border-secondaryText pb-4">
              <p className="mb-6 text-[2rem] text-primaryText">${book.price}</p>
              <p className="line-clamp-3 overflow-hidden text-ellipsis text-xl font-light text-[#444444]">
                {book.description}
              </p>
            </div>

            <div className="my-16 flex items-end gap-8 border-b border-solid border-secondaryText pb-12">
              <AddToCart book={book} />
              <AddToWishlist book={book} />
            </div>

            <div className="flex text-lg">
              <span className="text-secondartTextBold">Categories :</span>{" "}
              <p>
                {book.genres.map((genre, index) => (
                  <Link key={index} className="mx-4">
                    {genre.name}
                  </Link>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsContent;
