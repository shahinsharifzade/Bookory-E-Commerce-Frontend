import { MapPin, Phone, Star } from "lucide-react";
import React from "react";

const VendorDetailsBanner = ({ store }) => {
  return (
    <div
      className="flex h-[350px]  flex-col rounded-3xl bg-cover bg-center bg-no-repeat "
      style={{
        backgroundImage: `url("https://localhost:7047/assets/images/companies/banner/${store.bannerImage}")`,
      }}
    >
      <div className="relative flex h-full max-w-[36rem]">
        <div className="absolute inset-0 rounded-l-3xl bg-black opacity-80 "></div>

        <div className="z-10 flex flex-col px-[4rem] py-[3rem] text-2xl font-normal text-white">
          <div className="mb-8 h-[6.4rem] w-[6.4rem]">
            <img
              src={`${process.env.REACT_APP_IMR_SRC}/assets/images/companies/logo/${store.logo}`}
              alt={`${store.name} logo`}
              className="h-full w-full rounded-3xl border-4 border-solid border-white"
            />
          </div>

          <h4 className="mb-4 text-[2rem] font-semibold">{store.name}</h4>

          <div className="mb-4 flex gap-4">
            <div>
              <MapPin size={22} color="#fff" />
            </div>
            <p className="">{store.address}</p>
          </div>

          <div className="mb-4 flex items-center gap-4">
            <div>
              <Phone size={22} color="#fff" />
            </div>
            <p>{store.contactPhone}</p>
          </div>

          <div className="flex items-center gap-4">
            <Star color="#fff" />
            <p>{store.rating}</p>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default VendorDetailsBanner;
