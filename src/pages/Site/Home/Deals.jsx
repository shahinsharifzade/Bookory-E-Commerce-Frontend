import React from "react";
import Button from "../../../components/ui/Button/Button";
import DealsBanner from "../../../components/ui/DealsBanner/DealsBanner";
import DealsList from "../../../components/ui/DealsBanner/DealsList";

const Deals = () => {
  return (
    <section className="flex flex-col pb-32">
      <div className="container mb-14 flex flex-col items-center justify-between min-[470px]:flex-row">
        <div className="flex w-full max-w-[100%] items-center justify-center min-[470px]:justify-between">
          <h2 className="shrink-0 pr-12 text-[3.5rem] tracking-tighter">
            Deals of the week
          </h2>
          <div className="mx-4 hidden h-[1px] grow bg-[#e6e6e6] minw-md:block"></div>
        </div>
        <Button text="View All" className="w-[200px]" route={`/shop`} />
      </div>

      <div className="container flex flex-col minw-md:flex minw-md:flex-row  ">
        <DealsBanner />
        <DealsList />
      </div>
    </section>
  );
};

export default Deals;
