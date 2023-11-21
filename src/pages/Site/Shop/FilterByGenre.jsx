import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { setGenres } from "../../../features/bookFilter/bookFiltersSlice";
import { useNavigate } from "react-router-dom";
import { useGetAllGenres } from "../../../service/genreService";

const FilterByGenre = () => {
  const { data, isLoading, isError, error } = useGetAllGenres();

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const selectedGenres = useSelector((state) => state.filters.selectedGenres);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handGenreChange = (genreId) => {
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];

    dispatch(setGenres(updatedGenres));
  };
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
      console.log(error?.response.data.statusCode === 404);
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  return (
    <div>
      <div>
        <div className="pt-20">
          <h5 className="mb-12 border-b border-solid border-[#999999] pb-6 text-2xl font-semibold">
            Genres
          </h5>
          <ul className="flex flex-col gap-3 text-xl font-light">
            {data.map((genre, index) => (
              <div key={index} className="flex items-center justify-between">
                <label
                  key={genre.id}
                  className="flex cursor-pointer items-center"
                >
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    id={`genre-${genre.id}`}
                    value={genre.id}
                    checked={selectedGenres.includes(genre.id)}
                    onChange={() => handGenreChange(genre.id)}
                  />
                  <p p className="pl-4">
                    {genre.name}
                  </p>
                </label>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterByGenre;
