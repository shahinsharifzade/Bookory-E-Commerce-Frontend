import React, { useState } from "react";
import Header from "../../../layouts/Admin/Header/Header";
import Sidebar from "../../../layouts/Admin/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const AdminRoot = () => {
  const [MuiDrawer, setMuiDrawer] = useState(true);

  return (
    <>
      <Sidebar MuiDrawer={MuiDrawer} setMuiDrawer={setMuiDrawer} />

      <main
        className={`${
          MuiDrawer ? "ml-[40rem]" : "ml-0"
        } px-4 py-8 transition-all duration-300 ease-out`}
      >
        <Header MuiDrawer={MuiDrawer} setMuiDrawer={setMuiDrawer} />
        <Outlet />
      </main>
    </>
  );
};

export default AdminRoot;
