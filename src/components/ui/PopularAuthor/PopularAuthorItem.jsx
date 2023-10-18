import { ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const PopularAuthorItem = (props) => {
  return (
    <Link to={`/author/${props.author.id}`}>
      <div className="mb-12 flex w-full  items-center">
        <div className="mr-6 w-[6rem] shrink-0 rounded-2xl">
          <img
            src={`https://localhost:7047/assets/images/authors/${props.author.mainImage}`}
            alt="Auhtor Profile"
            className="aspect-[1/1] h-full w-full cursor-pointer rounded-2xl object-cover"
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <p>{props.author.name}</p>
          <div className="ml-6 rounded-full bg-white p-4">
            <ChevronRight strokeWidth="1px" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PopularAuthorItem;
