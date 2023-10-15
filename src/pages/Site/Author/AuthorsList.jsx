import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePrivateApi } from "../../../api";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import AuthorItem from "./AuthorItem";
import AuthorFilter from "./AuthorFilter";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 18;

const AuthorsList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const api = usePrivateApi();
  const navigate = useNavigate();

  const fetchAuthor = async (pageNumber, pageSize) => {
    const response = await api
      .get(`/authors/paged`, {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
        },
      })
      .catch((error) => {
        return <div>{error.response.data.message}</div>;
      });

    const authors = response.data.authors;
    const totalCount = response.data.totalCount;
    return { authors, totalCount };
  };

  const {
    data: authorsData,
    isLoading,
    isError,
    error,
  } = useQuery(
    {
      queryKey: ["authors", pageNumber, PAGE_SIZE],
      queryFn: () => fetchAuthor(pageNumber, PAGE_SIZE),
    },
    {
      retry: false,
    },
  );

  const [selectedLetter, setSelectedLetter] = useState("ALL");

  const handleFilterClick = (letter) => {
    setSelectedLetter(letter);
    setPageNumber(1);
  };

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  const filteredAuthors =
    selectedLetter === "ALL"
      ? authorsData.authors
      : authorsData.authors.filter((author) =>
          author.name.startsWith(selectedLetter),
        );

  return (
    <div className="container">
      <AuthorFilter
        selectedLetter={selectedLetter}
        onFilterClick={handleFilterClick}
      />
      <div className="flex flex-row flex-wrap ">
        {filteredAuthors?.length === 0 ? (
          <div className="my-auto mb-12 w-full text-center text-[40px] text-secondaryText">
            No authors found for the selected letter.
          </div>
        ) : (
          filteredAuthors?.map((author, index) => (
            <AuthorItem key={index} author={author} />
          ))
        )}
      </div>

      <div className="flex justify-center pb-24">
        <Stack spacing={3}>
          <Pagination
            count={authorsData.totalCount}
            page={pageNumber}
            onChange={(_, page) => setPageNumber(page)}
          />
        </Stack>
      </div>
    </div>
  );
};

export default AuthorsList;
