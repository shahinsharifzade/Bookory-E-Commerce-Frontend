import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuthorItem = ({ author, authorBooksCount }) => {
  return (
    <div className="mb-12 px-6 minw-md:w-1/5 minw-lg:w-1/6">
      <Link to={`/author/${author.id}`}>
        <div className="flex flex-col items-start justify-center">
          <div className="mb-8 h-36">
            <img
              src={`https://localhost:7047/assets/images/authors/${author.mainImage}`}
              alt="Auhtor Profile"
              className="aspect-[1/1] h-full w-full cursor-pointer rounded-2xl object-cover"
            />
          </div>
          <h3 className="line-clamp-1 overflow-hidden">{author.name}</h3>
          <p className="text-lg  text-[#999999]">
            {authorBooksCount} published books
          </p>
        </div>
      </Link>
    </div>
  );
};

export default AuthorItem;
