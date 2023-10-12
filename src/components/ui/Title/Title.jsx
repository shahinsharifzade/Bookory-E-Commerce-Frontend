import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../features/header/headerSelectedPage";

const Title = (props) => {
  const selectedPage = useSelector((state) => state.header.selectedPage);
  const dispatch = useDispatch();

  const handleClick = (selectedPageValue) => {
    dispatch(setPage(selectedPageValue));
  };

  return (
    <div className={`bg-[#f0f0f0] py-20 ${props.containerClasses}`}>
      <div className="container flex items-center justify-between">
        <h3
          className={`text-[5rem] font-semibold capitalize minw-sm:text-[6.4rem] ${props.titleClasses}`}
        >
          {props.title}
        </h3>
        <nav>
          <ul className="flex items-center text-lg text-[#999999]">
            <li>
              <Link
                className="uppercase text-[#999999]"
                to={"/"}
                onClick={() => handleClick("Home")}
              >
                {props.mainNav}
              </Link>
            </li>

            <ArrowRight className="mx-4" size={"14px"} />
            <li className="">
              <Link
                className="uppercase text-primaryText"
                to={`/${props.secondaryNav}`}
              >
                {props.secondaryNav}
              </Link>
            </li>

            <ArrowRight
              className={`${props.secondaryNavDisplay} mx-4`}
              size={"14px"}
            />

            <li>
              <Link
                className="uppercase text-primaryText"
                to={`/${props.lastNav}`}
              >
                {props.lastNav}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Title;

//Props { mainNav , containerClasses , titleClasses , secondaryNav , secondaryNavDisplay , lastNav ,   }
