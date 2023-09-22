import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

const Quote = () => {
  const quotes = [
    {
      quote: `"Excellent service. The books were wrapped securely and arrived in pristine condition. I sent an email after to books arrived to ask about the author."`,
      owner: "Ellie A",
      city: "New York",
    },
    {
      quote: `“This is the best book store! A wide variety. The prices are great, and there is always a sale of some kind going on. You can find just what you are looking for here.”`,
      owner: "Pam Pruitt",
      city: "New York",
    },
    {
      quote: `"I am so happy to find a site where I can shop for unusual items. The packaging was phenomenal and my book arrived on time in perfect condition."`,
      owner: "Joel M",
      city: "New York",
    },
  ];

  return (
    <section className="mb-[6rem]">
      <div className="w-full  bg-[url(https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/h1-bg2.jpg)] bg-cover bg-center bg-no-repeat">
        <div className="container px-6 pt-[6rem]">
          <div className="w-[100%] rounded-t-3xl bg-white px-12 pb-[6rem] pt-[6rem] text-center minw-md:w-[50%] minw-lg:w-[40%]">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {quotes.map((quote, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="pb-28">
                      <h3 className="mb-20 pb-8 font-semibold text-[#999999]">
                        What People Saying
                        <div className="h-[1px] w-32 bg-red-600"></div>
                      </h3>
                      <q className="mb-[3rem] text-[2rem] font-semibold">
                        {quote.quote}
                      </q>
                      <p className="mt-[2rem] pb-[3rem] text-lg font-normal uppercase">
                        {quote.owner}
                        <span className="font-light text-[#444444]">
                          {quote.city}
                        </span>
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quote;
