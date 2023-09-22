import React from "react";
import Logo from "../../../assets/icons/logo.svg";

import HeaderSearchBar from "./HeaderSearchBar";
import HeaderIcons from "./HeaderIcons";

const HeaderMiddle = () => {
  return (
    <section className="border-b border-solid border-secondaryText ">
      <div className="container flex py-[3rem]">
        <div className="md:mr-[40px] lg:mr-[10rem] flex items-center">
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
