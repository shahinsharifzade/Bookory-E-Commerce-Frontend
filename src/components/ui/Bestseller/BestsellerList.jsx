import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/bundle";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Pagination, Autoplay } from "swiper/modules";
import BestsellerItem from "./BestsellerItem";

const fetchBooks = async (search) => {
  const response = await axios
    .get(`https://localhost:7047/api/books`, {
      params: {
        search: search || "",
      },
    })
    .catch((error) => {
      console.log(error.response.data.message);
      return <div>{error.response.data.message}</div>;
    });
  return response.data;
};

const BestsellerList = () => {
  const {
    data: booksData,
    isLoading: booksLoading,
    isError: booksError,
  } = useQuery({ queryKey: ["books"], queryFn: fetchBooks });

  if (booksLoading) {
    return <div>Loading...</div>;
  }

  if (booksError) {
    return <div>Error fetching data</div>;
  }
  return (
    <section className="mb-32">
      <div className="">
        <Swiper
          breakpoints={{
            100: {
              width: 300,
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
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          //   autoplay={{
          //     delay: 2500,
          //     disableOnInteraction: false,
          //     pauseOnMouseEnter: true,
          //   }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {booksData.map((item, index) => {
            console.log(item);
            return (
              <SwiperSlide
                key={index}
                className="flex w-[300px] items-center justify-center bg-white text-center"
              >
                <BestsellerItem books={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default BestsellerList;
