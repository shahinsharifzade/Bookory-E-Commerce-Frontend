import React, { useEffect } from "react";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGenres } from "../../../features/bookFilter/bookFiltersSlice";
import { useGetAllGenres } from "../../../service/genreService";

const HeaderGenreList = ({ isHovered }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useGetAllGenres();

  const handleClick = (id) => {
    dispatch(setGenres([id]));
    navigate("/shop");
  };

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  return (
    <div
      className={`absolute left-0 top-full w-full rounded-3xl bg-white ${
        isHovered ? "block" : "hidden"
      }`}
    >
      <ul className="mt-[30px] h-[16rem] overflow-y-auto rounded-3xl border border-solid border-[#e4e4e4] bg-[#fff] scrollbar-thin scrollbar-track-white scrollbar-thumb-[#f65d4e] scrollbar-track-rounded-xl scrollbar-thumb-rounded-xl">
        <div className="absolute left-1/2 top-10 h-4 w-4 rotate-45  border border-b-0 border-r-0 border-solid border-[#e4e4e4] bg-white"></div>
        {data &&
          data.map((item) => (
            <li
              key={item.id}
              className="cursor-pointer  border-b border-solid border-secondaryText px-8 py-3"
              onClick={() => handleClick(item.id)}
            >
              <a
                href="#"
                className="text-[12px] font-light capitalize text-[#444444] hover:text-primaryText"
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
