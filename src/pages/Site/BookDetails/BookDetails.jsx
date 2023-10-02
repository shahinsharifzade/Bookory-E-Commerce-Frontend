import React from "react";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import Title from "../../../components/ui/Title/Title";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
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

  const {
    data: book,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["bookdetails", bookId],
    queryFn: () => fetchBook(bookId),
  });

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="container">
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
      <RelatedBooksList />
    </div>
  );
};

export default BookDetails;
