import { ChevronRight, Star } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
      className="w-full rounded-3xl px-6 py-12 minw-md:w-1/2 minw-lg:w-1/3"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`rounded-3xl shadow-2xl`}>
        <div
          style={{
            backgroundImage: isHovered
              ? `url("${process.env.REACT_APP_IMR_SRC}/assets/images/companies/banner/${store.bannerImage}")`
              : "none",
          }}
          className={`relative flex flex-col rounded-t-3xl ${
            isHovered
              ? `bg-cover bg-center bg-no-repeat transition-all duration-300 ease-in`
              : "bg-[#F5F5F5] "
          }  px-16  py-12`}
        >
          {isHovered && (
            <div className="absolute inset-0 rounded-t-3xl bg-black opacity-60 "></div>
          )}

          <div className="z-10">
            <Link to={`/store/${store.id}`}>
              <h2
                className={`${
                  isHovered ? "text-white" : "text-black"
                } mb-8 cursor-pointer text-[2rem]`}
              >
                {store.name}
              </h2>
            </Link>

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
                src={`${process.env.REACT_APP_IMR_SRC}/assets/images/companies/logo/${store.logo}`}
                alt={`${store.name} logo`}
                className="h-[6.4rem] w-[6.4rem] rounded-3xl border-4 border-solid border-white"
              />
            </div>
          </div>
        </div>

        <div className="rounded-b-3xl bg-white">
          <div className="py-6 pl-12">
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
