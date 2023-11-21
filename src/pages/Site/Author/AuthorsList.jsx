import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePrivateApi } from "../../../api";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import AuthorItem from "./AuthorItem";
import AuthorFilter from "./AuthorFilter";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useGetFilteredAuthors } from "../../../service/authorService";
import { PagesOutlined } from "@mui/icons-material";

const PAGE_SIZE = 18;

const AuthorsList = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const navigate = useNavigate();

  const {
    data: authorsData,
    isLoading,
    isError,
    error,
  } = useGetFilteredAuthors(pageNumber, PAGE_SIZE);

  const [selectedLetter, setSelectedLetter] = useState("ALL");

  const handleFilterClick = (e, letter) => {
    e.preventDefault();

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
            <AuthorItem
              key={index}
              author={author}
              authorBooksCount={author.books.length}
            />
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
