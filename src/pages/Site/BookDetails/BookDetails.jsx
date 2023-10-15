import React, { useEffect } from "react";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import Title from "../../../components/ui/Title/Title";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BookDetailsContent from "./BookDetailsContent";
import BookDetailsDesciption from "./BookDetailsDesciption";
import RelatedBooksList from "./RelatedBooksList";

const fetchBook = async (bookId) => {
  var response = await axios.get(`https://localhost:7047/api/Books/${bookId}`);
  return response.data;
};

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const {
    data: book,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookdetails", bookId],
    queryFn: () => fetchBook(bookId),
  });

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
