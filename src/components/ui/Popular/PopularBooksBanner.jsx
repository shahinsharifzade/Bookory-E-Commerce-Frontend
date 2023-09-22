import React from "react";
import { ChevronRight } from "lucide-react";

const PopularBooksBanner = () => {
  return (
    <div className="ml-0 py-12 min-[1200px]:ml-8">
      <div className="relative h-full w-full rounded-[3rem] bg-[url(https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/h1-banner1.jpg)] bg-cover bg-center bg-no-repeat min-[1200px]:min-w-[350px] ">
        <div className="absolute inset-0 rounded-[3rem] bg-black opacity-30"></div>

        <div className="relative flex min-h-[50rem] items-end minw-md:min-h-[20rem] min-[1200px]:min-h-full ">
          <div className="relative z-10 flex-col p-12 align-baseline text-white min-[1200px]:p-[6rem]">
            <p className="text-[2.2rem] font-semibold tracking-tighter">
              Best Offer
            </p>
            <h4 className="text-[4.8rem] font-semibold">Save $15 </h4>
            <p className="mb-8  text-lg">on selected books</p>
            <div>
              <div className="flex transition-all duration-500 ease-in-out">
                <a
                  href="#"
                  className="flex items-center rounded-[4rem] bg-white px-12 py-6 text-xl text-black "
                >
                  See More
                  <ChevronRight
                    className={`ml-2 translate-x-0 transform transition-transform`}
                    size={"14px"}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularBooksBanner;
