import React, { useState } from "react";
import Logo from "../../../assets/icons/logo.svg";

import HeaderSearchBar from "./HeaderSearchBar";
import HeaderIcons from "./HeaderIcons";
import { WrapText } from "lucide-react";
import { Drawer } from "@mui/material";
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

const HeaderMiddle = () => {
  const [MuiDrawer, setMuiDrawer] = useState(false);
  const selectedPage = useSelector((state) => state.header.selectedPage);
  const dispatch = useDispatch();

  const handleClick = (selectedPageValue) => {
    dispatch(setPage(selectedPageValue));
  };

  return (
    <section className="border-b border-solid border-secondaryText ">
      <div className="container flex items-center justify-between py-[3rem]">
        <div
          className="mr-8 cursor-pointer minw-1000:hidden"
          onClick={() => setMuiDrawer(true)}
        >
          <WrapText />
        </div>

        <div className="md:mr-[40px] lg:mr-[10rem] flex items-center">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="flex w-full justify-between">
          <HeaderSearchBar />
          <HeaderIcons />
        </div>

        <Drawer
          anchor="left"
          open={MuiDrawer}
          onClose={() => setMuiDrawer(false)}
        >
          <nav className="mt-[80px]">
            <ul className="flex flex-col items-start justify-start pl-20 pr-[100px] text-[18px] font-semibold">
              <div className="md:mr-[40px] lg:mr-[10rem] flex ">
                <a href="#">
                  <img src={Logo} alt="Logo" />
                </a>
              </div>

              {pages.map((item, index) => (
                <li
                  className={`my-10 mr-14 `}
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
        </Drawer>
      </div>
    </section>
  );
};

export default HeaderMiddle;
