import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import AuthorDetailsTop from "./AuthorDetailsTop";
import AuthorDetailsContent from "./AuthorDetailsContent";
import AuthorBooksList from "./AuthorBooksList";

const fetchAuthor = async (authorId) => {
  var response = await axios.get(
    `https://localhost:7047/api/Authors/${authorId}`,
  );
  return response.data;
};

const AuthorDetails = () => {
  const { authorId } = useParams();

  const {
    data: author,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["authordetails", authorId],
    queryFn: () => fetchAuthor(authorId),
  });

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  if (isError) return <div>Error fetching data</div>;

  return (
    <section>
      <div>
        <AuthorDetailsTop name={author.name} />
        <AuthorDetailsContent author={author} />
        <AuthorBooksList books={author.books} />
      </div>
    </section>
  );
};

export default AuthorDetails;
