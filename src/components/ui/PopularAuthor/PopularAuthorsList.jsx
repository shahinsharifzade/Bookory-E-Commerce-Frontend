import React, { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PopularAuthorItem from "./PopularAuthorItem";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const fetchAuthor = async () => {
  const response = await axios
    .get(`https://localhost:7047/api/Authors`)
    .catch((error) => {
      return <div>{error.response.data.message}</div>;
    });

  return response.data;
};

const PopularAuthorsList = () => {
  const navigate = useNavigate();

  const {
    data: authorsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["authors"],
    queryFn: fetchAuthor,
  });

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
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
