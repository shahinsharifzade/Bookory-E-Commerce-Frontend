import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchData = async () => {
  const response = await axios.get("https://localhost:7047/api/genres");
  return response.data;
};

const HeaderGenreList = ({ isHovered }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div
      className={`absolute left-0 top-full w-full  bg-white ${
        isHovered ? "block" : "hidden"
      }`}
    >
      <ul className="mt-[30px] rounded-3xl border border-solid border-[#e4e4e4] bg-[#fff]">
        <div className="absolute left-1/2 top-10 h-4 w-4 rotate-45 border border-b-0 border-r-0 border-solid border-[#e4e4e4] bg-white"></div>
        {data.map((item) => (
          <li
            key={item.id}
            className="border-secondaryText cursor-pointer border-b border-solid px-8 py-3 "
          >
            <a
              href="#"
              className="text-[12px] font-light text-[#444444] hover:text-primaryText"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeaderGenreList;
