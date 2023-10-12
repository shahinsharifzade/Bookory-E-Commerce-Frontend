import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPage } from "../../../features/header/headerSelectedPage";

const pages = [
  {
    route: "",
    page: "Home",
  },
  {
    route: "/shop",
    page: "Shop",
  },
  {
    route: "/store",
    page: "Vendor",
  },
  {
    route: "/author",
    page: "Author",
  },
  {
    route: "/blog",
    page: "Blog",
  },
  {
    route: "/contact",
    page: "Contact",
  },
];

const HeaderBottom = () => {
  const selectedPage = useSelector((state) => state.header.selectedPage);
  const dispatch = useDispatch();

  const handleClick = (selectedPageValue) => {
    dispatch(setPage(selectedPageValue));
  };

  return (
    <section className="hidden minw-lg:block">
      <div className="container">
        <nav>
          <ul className="flex items-center justify-center">
            {pages.map((item, index) => (
              <li
                className={`mx-14 my-10 `}
                key={index}
                onClick={() => handleClick(item.page)}
              >
                <Link
                  to={item.route}
                  className={
                    selectedPage === item.page
                      ? "text-primaryText"
                      : "text-black"
                  }
                >
                  {item.page}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default HeaderBottom;
