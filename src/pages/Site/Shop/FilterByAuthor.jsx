import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";

const fetchAuthor = async () => {
  const response = await axios
    .get(`https://localhost:7047/api/Authors`)
    .catch((error) => {
      return <div>{error.response.data.message}</div>;
    });

  return response.data;
};

const FilterByAuthor = ({ onAuthorsChange }) => {
  const {
    data: authorsData,
    isLoading: auhtorsLoading,
    isError: auhtorsError,
  } = useQuery({
    queryKey: ["authors"],
    queryFn: fetchAuthor,
  });

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  const handleAuthorChange = (authorId) => {
    const updatedAuthors = selectedAuthors.includes(authorId)
      ? selectedAuthors.filter((id) => id !== authorId)
      : [...selectedAuthors, authorId];

    setSelectedAuthors(updatedAuthors);

    onAuthorsChange(updatedAuthors);
  };
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  if (auhtorsLoading) return <LoadingSpinner isLoading={auhtorsLoading} />;

  if (auhtorsError) return <div>Error fetching data</div>;

  return (
    <div>
      <div>
        <div className="pt-20">
          <h5 className="mb-12 border-b border-solid border-[#999999] pb-6  text-2xl font-semibold">
            Authors
          </h5>
          <ul className="flex flex-col gap-3 text-xl font-light">
            {authorsData.map((author) => (
              <div
                key={author.id}
                className="flex items-center justify-between"
              >
                <label
                  key={author.id}
                  className="flex cursor-pointer items-center"
                >
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    id={`author-${author.id}`}
                    value={author.id}
                    checked={selectedAuthors.includes(author.id)}
                    onChange={() => handleAuthorChange(author.id)}
                  />
                  <p p className="pl-4">
                    {author.name}
                  </p>
                </label>
                <span className="cursor-pointer font-light text-[#999999]">{`( ${author.books.length} )`}</span>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterByAuthor;
