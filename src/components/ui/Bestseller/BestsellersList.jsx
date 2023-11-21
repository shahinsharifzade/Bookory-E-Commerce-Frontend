import React, { useEffect } from "react";

import "swiper/css";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import BestsellerItem from "./BestsellerItem";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useGetFilteredBooks } from "../../../service/bookService";
import { useNavigate } from "react-router-dom";

const BestsellersList = () => {
  const navigate = useNavigate();
  const {
    data: booksData,
    isLoading: bookIsLoading,
    isError: booksError,
    error,
  } = useGetFilteredBooks(
    1,
    15,
    undefined,
    undefined,
    undefined,
    undefined,
    "popularity",
  );

  useEffect(() => {
    if (booksError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [booksError]);
  if (bookIsLoading) return <LoadingSpinner isLoading={bookIsLoading} />;

  return (
    <section className="mb-32">
      <div>
        <Swiper
          breakpoints={{
            449: {
              slidesPerView: 1,
            },
            450: {
              width: 660,
              slidesPerView: 2,
            },
            768: {
              width: 720,
              slidesPerView: 3,
            },
            870: {
              width: 940,
              slidesPerView: 4,
            },
            1000: {
              width: 1220,
              slidesPerView: 4,
            },
            1600: {
              width: 1980,
              slidesPerView: 6,
            },
          }}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {booksData.books.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <BestsellerItem book={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default BestsellersList;
