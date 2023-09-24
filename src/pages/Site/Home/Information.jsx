import React from "react";
import BooksInformation from "../../../components/ui/Information/BooksInformation";
import AuthorsInformation from "../../../components/ui/Information/AuthorsInformation";
import HappyCustomerInformation from "../../../components/ui/Information/HappyCustomerInformation";

const Information = () => {
  return (
    <section className="container mb-32">
      <div className="flex flex-row max-[1250px]:flex-col">
        <div className=" mb-6 w-full min-[1250px]:w-1/2">
          <BooksInformation />
        </div>
        <div className="mb-6 flex w-full min-[1250px]:w-1/2">
          <AuthorsInformation />
          <HappyCustomerInformation />
        </div>
      </div>
    </section>
  );
};

export default Information;
