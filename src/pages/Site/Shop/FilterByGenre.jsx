import React, { useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const fetchGenre = async () => {
  const response = await axios
    .get(`https://localhost:7047/api/Genres`)
    .catch((error) => {
      return <div>{error.response.data.message}</div>;
    });

  return response.data;
};

const FilterByGenre = ({ onGenresChange }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenre,
  });

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [setselectedGenres, setSelectedGenres] = useState([]);

  const handGenreChange = (genreId) => {
    const updatedGenres = setselectedGenres.includes(genreId)
      ? setselectedGenres.filter((id) => id !== genreId)
      : [...setselectedGenres, genreId];

    setSelectedGenres(updatedGenres);

    onGenresChange(updatedGenres);
  };
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <div>
        <div className="pt-20">
          <h5 className="mb-12 border-b border-solid border-[#999999] pb-6 text-2xl font-semibold">
            Genres
          </h5>
          <ul className="flex flex-col gap-3 text-xl font-light">
            {data.map((genre) => (
              <div className="flex items-center justify-between">
                <label
                  key={genre.id}
                  className="flex cursor-pointer items-center"
                >
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    id={`genre-${genre.id}`}
                    value={genre.id}
                    checked={setselectedGenres.includes(genre.id)}
                    onChange={() => handGenreChange(genre.id)}
                  />
                  <p p className="pl-4">
                    {genre.name}
                  </p>
                </label>
                <span className="cursor-pointer font-light text-[#999999]">{`( ${genre.books.length} )`}</span>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterByGenre;
