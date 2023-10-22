import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../layouts/Vendor/Sidebar/Sidebar";

const VendorRoot = () => {
  const [MuiDrawer, setMuiDrawer] = useState(true);

  return (
    <>
      <Sidebar MuiDrawer={MuiDrawer} setMuiDrawer={setMuiDrawer} />

      <main
        className={`${
          MuiDrawer ? "ml-[40rem]" : "ml-0"
        } px-4 py-8 transition-all duration-300 ease-out`}
      >
        <Outlet />
      </main>
    </>
  );
};

export default VendorRoot;
