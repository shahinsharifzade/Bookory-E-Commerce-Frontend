import React, { useEffect } from "react";
import PopularAuthorItem from "./PopularAuthorItem";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useGetFilteredAuthors } from "../../../service/authorService";

const PopularAuthorsList = () => {
  const navigate = useNavigate();

  const {
    data: authorsData,
    isLoading,
    isError,
    error,
  } = useGetFilteredAuthors(1, 8);

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <div className="flex h-full flex-col justify-around minw-lg:justify-normal">
      {authorsData.authors.map((author, index) => {
        return <PopularAuthorItem key={index} author={author} />;
      })}
    </div>
  );
};

export default PopularAuthorsList;
