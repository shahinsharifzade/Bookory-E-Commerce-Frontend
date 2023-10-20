import React from "react";
import KeepReadingList from "../../../components/ui/KeepReading/KeepReadingList";
import Button from "../../../components/ui/Button/Button";

const KeepReading = () => {
  return (
    <section className="w-full">
      <div className="container mb-14 flex flex-col items-center justify-between min-[470px]:flex-row">
        <div className="flex w-full max-w-[100%] items-center justify-between">
          <h2 className="shrink-0 pr-12 text-[3.5rem] tracking-tighter">
            Keep Reading
          </h2>
          <div className="mx-4 hidden h-[1px] grow bg-[#e6e6e6] minw-md:block"></div>
        </div>
        <Button text="View All" className="w-[200px]" route={`/shop`} />
      </div>

      <KeepReadingList />
    </section>
  );
};

export default KeepReading;
