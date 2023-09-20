import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import "animate.css";

const Banner = () => {
  const [iconHovered, setIconHovered] = useState(false);

  const handleIconHover = () => {
    setIconHovered(true);
  };
  const handleIconUnhover = () => {
    setIconHovered(false);
  };

  return (
    <section className=" h-[60rem] w-full bg-[url(https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/revslider_1.jpg)] bg-cover bg-center bg-no-repeat  ">
      <div className="container flex h-full items-center justify-end">
        <div className="animate__fadeInUp text-center">
          <p className="pb-16 text-lg font-medium text-[#999999]">
            A SALE OF THE PAGES
          </p>
          <div className="relative ">
            <h1 className="animate__animated animate__fadeInLeft text-[6rem] leading-none text-black duration-1000">
              50% Off Hundreds <br /> Of Books
            </h1>
            <img
              src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/revslider_vector.png"
              className="animate__animated animate__fadeInLeft absolute left-0 top-20"
              alt=""
            />
          </div>
          <p className="animate__fadeInUp animate__animated z-30 pt-12 text-primaryText">
            Online And In Stores Only
          </p>
          <div
            className="flex items-center justify-center transition-all duration-500 ease-in-out"
            onMouseEnter={handleIconHover}
            onMouseLeave={handleIconUnhover}
          >
            <a
              href="#"
              className="mt-6 flex items-center rounded-[4rem] bg-white px-12 py-6 text-xl text-black hover:bg-black hover:text-white"
            >
              Shop Now
              <ChevronRight
                className={`ml-2 translate-x-0 transform transition-transform  ${
                  iconHovered ? "translate-x-2" : ""
                } `}
                size={"14px"}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
