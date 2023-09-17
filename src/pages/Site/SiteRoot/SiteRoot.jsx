import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../../layouts/Site/Header";
import Footer from "../../../layouts/Site/Footer";

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
