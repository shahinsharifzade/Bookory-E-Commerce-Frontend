import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/bundle";
import { Autoplay } from "swiper/modules";
import TrendItem from "./TrendItem";

//API
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
//API

const TrendList = () => {
  // API
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
  //API

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
          resizeObserver={true}
          observer={true}
          updateOnWindowResize={true}
          onTimeUpdate={true}
          onBreakpoint={true}
          grabCursor={true}
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
            console.log(item);
            return (
              <SwiperSlide className="w-full px-12">
                <TrendItem books={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default TrendList;
