import React, { useEffect } from "react";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import Title from "../../../components/ui/Title/Title";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BookDetailsContent from "./BookDetailsContent";
import BookDetailsDesciption from "./BookDetailsDesciption";
import RelatedBooksList from "./RelatedBooksList";
import { useGetBookById } from "../../../service/bookService";

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const { data: book, isError, isLoading, error } = useGetBookById(bookId);

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  return (
    <section className="container">
      <Title
        containerClasses={"bg-[#fff] py-10"}
        titleClasses={"hidden"}
        mainNav={"Home"}
        secondaryNav={"Shop"}
        secondaryNavDisplay={"block"}
        lastNav={book.title}
      />

      <BookDetailsContent book={book} />
      <BookDetailsDesciption book={book} />
      <RelatedBooksList selectedGenres={book.genres} />
    </section>
  );
};

export default BookDetails;
