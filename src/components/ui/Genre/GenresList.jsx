import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Loading/LoadingSpinner";
import GenreItem from "./GenreItem";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";

const fetchGenres = async (search) => {
  const response = await axios
    .get(`https://localhost:7047/api/genres`)
    .catch((error) => {
      return <div>{error.response.data.message}</div>;
    });
  return response.data;
};

const GenresList = () => {
  const {
    data: genresData,
    isLoading: genreIsLoading,
    isError: genresError,
  } = useQuery({ queryKey: ["genres"], queryFn: fetchGenres });

  if (genreIsLoading) {
    return <LoadingSpinner isLoading={genreIsLoading} />;
  }

  if (genresError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="container">
      <Swiper
        breakpoints={{
          200: {
            slidesPerView: 1,
          },
          800: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 3,
          },
        }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {genresData.map((item, index) => {
          return (
            <SwiperSlide key={index} className="w-full px-6">
              <GenreItem genres={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default GenresList;
