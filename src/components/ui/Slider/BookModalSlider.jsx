import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const BookModalSlider = ({ booksArr, bookId, isOpened, setModalIsOpened }) => {
  const [currentBookIndex, setCurrentBookIndex] = useState(0);

  useEffect(() => {
    const index = booksArr.findIndex((book) => book.id === bookId);
    setCurrentBookIndex(index !== -1 ? index : 0);
  }, [bookId, booksArr]);

  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={isOpened}
        onClick={() => setModalIsOpened(false)}
      >
        <Swiper
          loop={true}
          initialSlide={currentBookIndex}
          navigation={true}
          modules={[Navigation]}
          slidesPerView={1}
          key={currentBookIndex}
          className="mySwiper "
          onSwiper={(swiper) => {
            if (swiper.navigation) {
              swiper.navigation.nextEl.addEventListener("click", (e) =>
                e.stopPropagation(),
              );
              swiper.navigation.prevEl.addEventListener("click", (e) =>
                e.stopPropagation(),
              );
            }
          }}
        >
          {booksArr.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                style={{ display: "flex", justifyContent: "center" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-[400px] w-[400px] border-2 border-solid ">
                  <img
                    src={`${process.env.REACT_APP_IMR_SRC}/assets/images/books/${item.mainImage}`}
                    alt=""
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Backdrop>
    </div>
  );
};

export default BookModalSlider;
