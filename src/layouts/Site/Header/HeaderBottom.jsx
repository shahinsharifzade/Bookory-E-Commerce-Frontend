import React from "react";
import { Link } from "react-router-dom";

const HeaderBottom = () => {
  return (
    <section className="hidden minw-lg:block">
      <div className="container">
        <nav>
          <ul className="flex items-center justify-center">
            <li className=" mx-14 my-10">
              <Link to={""}>Home</Link>
            </li>
            <li className="mx-14 my-10">
              <Link to="/shop">Shop</Link>
            </li>
            <li className="mx-14 my-10">
              <Link to={"/store"}>Vendor</Link>
            </li>
            <li className="mx-14 my-10">
              <Link to={"/author"}>Author </Link>
            </li>
            <li className="mx-14 my-10">Blog</li>
            <li className="mx-14 my-10">Contact</li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default HeaderBottom;
