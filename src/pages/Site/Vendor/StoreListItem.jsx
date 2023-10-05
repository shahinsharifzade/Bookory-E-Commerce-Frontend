import { ChevronRight, Star } from "lucide-react";
import React, { useState } from "react";

const StoreListItem = ({ store }) => {
  const bookRatingStars = [];
  const [isHovered, setIsHovered] = useState(false);

  for (let index = 0; index < 5; index++) {
    if (index < store.rating) {
      bookRatingStars.push(
        <Star key={index} color="#f65d4e" fill="#f65d4e" size={"14px"} />,
      );
    } else {
      bookRatingStars.push(<Star key={index} color="#f65d4e" size={"14px"} />);
    }
  }

  return (
    <div
      className="my-12 w-full rounded-3xl px-6 minw-md:w-1/2 minw-lg:w-1/3"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-3xl shadow-2xl">
        <div
          className={`relative flex flex-col  ${
            isHovered
              ? "bg-[url('https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/11/cropped-bg_store8.jpg')] bg-cover bg-center bg-no-repeat"
              : "bg-[#F5F5F5] "
          }  px-16  py-12`}
        >
          {isHovered && (
            <div className="absolute inset-0 rounded-3xl bg-black opacity-60 transition-opacity duration-300 group-hover:opacity-0"></div>
          )}
          <div className="z-10">
            <h2
              className={`${
                isHovered ? "text-white" : "text-black"
              } mb-8 cursor-pointer text-[2rem]`}
            >
              {store.name}
            </h2>
            <div className="mb-6 flex">{bookRatingStars}</div>
            <div
              className={`text-xl font-normal ${
                isHovered ? "text-white" : "text-secondartTextBold"
              }`}
            >
              <p className="mb-4">{store.address}</p>
              <p className="mb-4"> {store.contactPhone}</p>
            </div>

            <div className="absolute -bottom-[32px] right-[32px] cursor-pointer">
              <img
                src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/11/store-7.jpg"
                className="h-[6.4rem] w-[6.4rem] rounded-3xl border-4 border-solid border-white"
              />
            </div>
          </div>
        </div>

        <div className="rounded-bl-3xl rounded-br-3xl bg-white">
          <div className=" py-6 pl-12">
            <div className=" w-min cursor-pointer rounded-full border border-solid border-secondaryText bg-primaryText ">
              <ChevronRight size={"26px"} color="#fff" className="mx-2 my-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreListItem;
