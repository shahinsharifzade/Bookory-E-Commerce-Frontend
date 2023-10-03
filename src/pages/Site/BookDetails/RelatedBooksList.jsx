import React from "react";
import { useGetFilteredBooks } from "../../../service/bookService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import BookListItem from "./BookListItem";

const PAGE_NUMBER = 1;
const PAGE_SIZE = 6;

const RelatedBooksList = ({ selectedGenres }) => {
  const genres = selectedGenres.map((genre) => genre.id);

  const { data, isLoading } = useGetFilteredBooks(
    PAGE_NUMBER,
    PAGE_SIZE,
    undefined,
    genres,
  );

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <div>
      <div className="mb-16 flex  items-center gap-8">
        <div className="shrink-0 text-[3rem] ">Related Books</div>
        <div className="max-h-[1px] w-full border border-solid border-secondaryText"></div>
      </div>
      <div>
        <div className="flex flex-wrap max-[992px]:justify-around">
          {data.books.map((item, index) => {
            return <BookListItem key={index} book={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default RelatedBooksList;
