import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import AuthorDetailsTop from "./AuthorDetailsTop";
import AuthorDetailsContent from "./AuthorDetailsContent";
import AuthorBooksList from "./AuthorBooksList";
import { useGetAuthorById } from "../../../service/authorService";

const AuthorDetails = () => {
  const { authorId } = useParams();
  const navigate = useNavigate();

  const {
    data: author,
    isError,
    isLoading,
    error,
  } = useGetAuthorById(authorId);

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
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
