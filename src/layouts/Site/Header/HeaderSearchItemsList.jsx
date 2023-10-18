import React, { useEffect } from "react";
import HeaderSearchItem from "./HeaderSearchItem";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { useGetFilteredBooks } from "../../../service/bookService";

const HeaderSearchItemsList = () => {
  const search = useSelector((state) => state.filters.search);

  const {
    data: books,
    isLoading,
    isError,
  } = useGetFilteredBooks(
    1,
    3,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    search,
    undefined,
  );

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <div className="absolute left-0 top-[110%] w-full rounded-3xl  bg-white">
      <ul className="mt-[25px] rounded-3xl border border-t-0 border-solid border-[#e4e4e4] bg-[#fff]">
        {isError && search != "" ? (
          <div className="rounded-3xl border-t border-solid border-secondaryText px-4 py-5">
            No books found
          </div>
        ) : books !== undefined && search !== "" ? (
          books.books.map((item) => {
            return <HeaderSearchItem book={item} />;
          })
        ) : null}
      </ul>
    </div>
  );
};

export default HeaderSearchItemsList;
