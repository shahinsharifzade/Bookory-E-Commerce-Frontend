import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <Link
      to={props.route}
      className="ml-20 flex shrink-0 items-center justify-center transition-all duration-500 ease-in-out"
    >
      <a
        href="#"
        className="flex items-center rounded-[4rem] bg-primaryText px-12 py-6 text-xl text-white "
      >
        {props.text}
        <ChevronRight
          className={`ml-2 translate-x-0 transform transition-transform ${props.iconClasses}`}
          size={"14px"}
        />
      </a>
    </Link>
  );
};

export default Button;
