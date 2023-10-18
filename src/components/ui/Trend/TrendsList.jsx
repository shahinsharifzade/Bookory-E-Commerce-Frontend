import React, { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/bundle";
import { Autoplay } from "swiper/modules";
import TrendItem from "./TrendItem";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useGetFilteredBooks } from "../../../service/bookService";

const TrendsList = () => {
  const navigate = useNavigate();

  const {
    data: booksData,
    isLoading: bookIsLoading,
    isError: booksError,
    error,
  } = useGetFilteredBooks(1, 30);

  useEffect(() => {
    if (booksError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [booksError]);

  if (bookIsLoading) return <LoadingSpinner isLoading={bookIsLoading} />;

  return (
    <section>
      <div>
        <Swiper
          breakpoints={{
            999: {
              slidesPerView: 1,
            },
            1000: {
              width: 1260,
              slidesPerView: 2,
            },
            1400: {
              width: 1820,
              slidesPerView: 3,
            },
          }}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {booksData.books.map((item, index) => {
            return (
              <SwiperSlide key={index} className="w-full px-12">
                <TrendItem books={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default TrendsList;
