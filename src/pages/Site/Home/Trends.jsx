import React from "react";
import Button from "../../../components/ui/Button/Button";
import TrendList from "../../../components/ui/Trend/TrendsList";

const Trends = () => {
  return (
    <section className="mb-[6rem]">
      <div className="container mb-14 flex flex-col items-center justify-between min-[470px]:flex-row">
        <div className="flex w-full max-w-[100%] items-center justify-center min-[470px]:justify-between">
          <h2 className="shrink-0 pr-12 text-[3.5rem] tracking-tighter">
            What's In Trend
          </h2>
          <div className="mx-4 hidden h-[1px] grow bg-[#e6e6e6] minw-md:block"></div>
        </div>
        <Button text="View All" className="w-[200px]" route={`/shop`} />
      </div>

      <TrendList />
    </section>
  );
};

export default Trends;
