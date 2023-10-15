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

//API
const fetchBooks = async (search) => {
  const response = await axios
    .get(`https://localhost:7047/api/books`)
    .catch((error) => {
      return <div>{error.response.data.message}</div>;
    });
  return response.data;
};
//API

const TrendsList = () => {
  const navigate = useNavigate();

  // API
  const {
    data: booksData,
    isLoading: bookIsLoading,
    isError: booksError,
    error,
  } = useQuery({ queryKey: ["books"], queryFn: fetchBooks });

  useEffect(() => {
    if (booksError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [booksError]);
  //API

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
          {booksData.map((item, index) => {
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
