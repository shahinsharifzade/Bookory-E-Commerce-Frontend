import React from "react";
import Button from "../../../components/ui/Button/Button";
import BestsellerList from "../../../components/ui/Bestseller/BestsellersList";

const Bestsellers = () => {
  return (
    <section className="mb-32 pt-16 ">
      <div className="container mb-14 flex flex-col items-center justify-between min-[470px]:flex-row ">
        <div className="flex w-full max-w-[100%] items-center justify-center min-[470px]:justify-between">
          <h2 className="shrink-0 pr-12 text-[3.5rem] tracking-tighter">
            Bestselling books
          </h2>

          <div className="mx-4 mr-20 hidden h-[1px] grow bg-[#e6e6e6] minw-md:block"></div>
        </div>
        <Button text="View All" className="w-[200px]" route={`/shop`} />
      </div>

      <BestsellerList />
    </section>
  );
};

export default Bestsellers;
