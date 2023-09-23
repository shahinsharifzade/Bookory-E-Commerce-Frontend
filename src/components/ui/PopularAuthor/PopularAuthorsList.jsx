import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PopularAuthorItem from "./PopularAuthorItem";
import LoadingSpinner from "../Loading/LoadingSpinner";

const fetchAuthor = async () => {
  const response = await axios
    .get(`https://localhost:7047/api/Authors`)
    .catch((error) => {
      return <div>{error.response.data.message}</div>;
    });

  return response.data;
};

const PopularAuthorsList = () => {
  const {
    data: authorsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["authors"],
    queryFn: fetchAuthor,
  });

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const limitedAuthorsData = authorsData.slice(0, 8);

  return (
    <div className="flex h-full flex-col justify-around minw-lg:justify-normal">
      {limitedAuthorsData.map((author, index) => {
        return <PopularAuthorItem key={index} author={author} />;
      })}
    </div>
  );
};

export default PopularAuthorsList;
