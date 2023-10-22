import React from "react";
import BookStoreItem from "./BookStoreItem";

const OutBookStoresList = () => {
  return (
    <div className="container">
      <h2 className="pb-16 text-center text-[26px]">Our Book Store</h2>

      <div className="mb-16 flex gap-2 max-minw-md:flex-wrap max-minw-md:justify-center">
        {[...Array(3)].map((store, index) => {
          return <BookStoreItem key={index} />;
        })}
      </div>
    </div>
  );
};

export default OutBookStoresList;
