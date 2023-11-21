import React from "react";

const BookPrice = ({ book, priceClasses, discountPriceClasses, container }) => {
  return (
    <div className={`flex gap-2 ${container}`}>
      <p className={`font-medium text-primaryText ${priceClasses}`}>
        {book && book.price - (book.price * book.discountPercentage) / 100}$
      </p>
      <p
        className={`self-end text-xl font-medium line-through ${
          book.discountPercentage === 0 ? "hidden" : ""
        } ${discountPriceClasses}`}
      >
        {book.discountPercentage && book.price}$
      </p>
    </div>
  );
};

export default BookPrice;
