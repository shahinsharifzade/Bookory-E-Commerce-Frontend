import React from "react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import GenreItem from "./GenreItem";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useGetAllGenres } from "../../../service/genreService";

const GenresList = () => {
  const {
    data: genresData,
    isLoading: genreIsLoading,
    isError: genresError,
  } = useGetAllGenres();

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
