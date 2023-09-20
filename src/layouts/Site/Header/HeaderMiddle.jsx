import React from "react";
import Logo from "../../../assets/logo.svg";

import HeaderSearchBar from "./HeaderSearchBar";
import HeaderIcons from "./HeaderIcons";

const HeaderMiddle = () => {
  return (
    <section className="border-secondaryText border-b border-solid ">
      <div className="container flex py-[3rem]">
        <div className="flex items-center md:mr-[40px] lg:mr-[10rem]">
          <a href="#">
            <img src={Logo} alt="Logo" />
          </a>
        </div>

        <div className="flex w-full justify-between">
          <HeaderSearchBar />
          <HeaderIcons />
        </div>
      </div>
    </section>
  );
};

export default HeaderMiddle;
