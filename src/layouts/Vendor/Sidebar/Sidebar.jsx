import { Divider, Drawer } from "@mui/material";
import Logo from "../../../assets/icons/logo.svg";
import React from "react";
import {
  BookCopy,
  BookOpen,
  Component,
  Contact,
  FileSpreadsheet,
  Package,
  PenLine,
  Store,
  Undo2,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { usePrivateApi } from "../../../api";

const Sidebar = ({ MuiDrawer }) => {
  const authApi = usePrivateApi();
  const sideBar = [
    {
      icon: <BookOpen size={20} />,
      title: "Books",
      route: "books",
    },
    {
      icon: <BookOpen size={20} />,
      title: "Store Details",
      route: "storedetails",
    },
  ];

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={MuiDrawer}
    >
      <aside className="fixed left-0 top-0 h-full py-8">
        <div className="ml-8 h-full rounded-3xl  border border-solid border-secondaryText shadow-2xl">
          <div className="h-full w-[350px] ">
            <div className="mx-8 my-8 flex h-full flex-col justify-between">
              <div>
                <div className="mb-6">
                  <img src={Logo} alt="bookory logo" />
                </div>

                <Divider />

                <ul>
                  {sideBar.map((item, index) => (
                    <li className="my-6 text-[18px]" key={index}>
                      <Link
                        to={`${item.route}`}
                        className="flex cursor-pointer items-center gap-10 font-semibold"
                      >
                        <div>{item.icon}</div>
                        <div>{item.title}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={"/"}
                className="mb-12 flex cursor-pointer items-center justify-center gap-4"
              >
                <Undo2 />
                <p className="mt-2 text-[18px] hover:underline">
                  Return Home page
                </p>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </Drawer>
  );
};

export default Sidebar;
