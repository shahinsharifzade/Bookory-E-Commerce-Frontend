import React, { useEffect } from "react";

import "swiper/css";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import { useGetFilteredBooks } from "../../../service/bookService";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import OnSaleItem from "./OnSaleItem";

const OnSaleBooks = () => {
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
    "onSale",
  );

  useEffect(() => {
    if (booksError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [booksError]);
  if (bookIsLoading) return <LoadingSpinner isLoading={bookIsLoading} />;

  return (
    <div className="container mb-28">
      <div className="flex items-center">
        <h1 className="m-8 shrink-0 border-b-[4px] border-solid border-primaryText pb-4 text-[20px] ">
          On Sale
        </h1>
        <div className="h-[1px] w-full border border-solid border-secondaryText "></div>
      </div>

      <Swiper
        breakpoints={{
          449: {
            slidesPerView: 1,
          },
          450: {
            width: 730,
            slidesPerView: 2,
          },
          870: {
            width: 1000,
            slidesPerView: 4,
          },
          1000: {
            width: 1300,
            slidesPerView: 6,
          },
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {booksData &&
          booksData.books.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <OnSaleItem books={item} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default OnSaleBooks;
