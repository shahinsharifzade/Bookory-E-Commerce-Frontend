import React from "react";
import PopularAuthorsList from "../../../components/ui/PopularAuthor/PopularAuthorsList";

const PopularAuthors = () => {
  return (
    <section className="mb-8 shrink-0 minw-md:w-[50%] minw-lg:w-[33%]">
      <div className="h-full rounded-[3rem] bg-[#fff8f2] p-4  min-[350px]:px-12 min-[350px]:py-16 ">
        <h2 className="mb-12 border-b border-solid border-secondaryText pb-4 text-[2.6rem] font-bold">
          Popular Authors
        </h2>
        <PopularAuthorsList />
      </div>
    </section>
  );
};

export default PopularAuthors;
