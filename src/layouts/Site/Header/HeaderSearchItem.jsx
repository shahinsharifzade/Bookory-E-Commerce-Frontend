import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import { setBookSearch } from "../../../features/bookFilter/bookFiltersSlice";

const HeaderSearchItem = ({ book }) => {
  const dispatch = useDispatch();

  return (
    <li key={book.id} onClick={() => dispatch(setBookSearch(""))}>
      <Link to={`shop/${book.id}`} className="flex items-center px-4 py-4">
        <div>
          <img
            src={`${process.env.REACT_APP_BASE_URL}/assets/images/books/${book.mainImage}`}
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
