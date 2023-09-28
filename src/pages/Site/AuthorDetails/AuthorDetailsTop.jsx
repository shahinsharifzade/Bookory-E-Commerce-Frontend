import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AuthorDetailsTop = ({ name }) => {
  return (
    <div className="container">
      <div className="flex flex-wrap items-center text-lg font-medium uppercase text-primaryText">
        <Link className="text-[#999999 ] font-semibold" to={"/"}>
          Home
        </Link>
        <div className=" px-4">
          <ArrowRight size={"14px"} />
        </div>
        <p>PRODUCT BOOK AUTHOR</p>
        <div className="px-4">
          <ArrowRight size={"14px"} />
        </div>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default AuthorDetailsTop;
