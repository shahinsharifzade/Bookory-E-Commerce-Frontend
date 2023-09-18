import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../../../layouts/Site/Header/Header";
import Footer from "../../../layouts/Site/Footer/Footer";

const SiteRoot = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default SiteRoot;
