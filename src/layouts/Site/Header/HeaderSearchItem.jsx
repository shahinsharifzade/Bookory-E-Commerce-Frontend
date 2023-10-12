import { setSearch } from "../../../features/bookFilter/bookFiltersSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";

const HeaderSearchItem = ({ book }) => {
  const dispatch = useDispatch();

  return (
    <li key={book.id} onClick={() => dispatch(setSearch(""))}>
      <Link to={`shop/${book.id}`} className="flex items-center px-4 py-4">
        <div>
          <img
            src={`https://localhost:7047/assets/images/books/${book.mainImage}`}
            alt={`${book.title} cover`}
            className="h-28 w-20 object-cover"
          />
        </div>

        <p className="pl-4 font-medium text-black">{book.title}</p>
      </Link>
    </li>
  );
};

export default HeaderSearchItem;
