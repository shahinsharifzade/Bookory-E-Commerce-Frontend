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
  SendToBack,
  Store,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ MuiDrawer, setMuiDrawer }) => {
  const sideBar = [
    {
      icon: <BookOpen size={20} />,
      title: "Books",
      route: "books",
    },
    {
      icon: <PenLine size={20} />,
      title: "Authors",
      route: "authors",
    },
    {
      icon: <BookCopy size={20} />,
      title: "Blogs",
      route: "blogs",
    },
    {
      icon: <Component size={20} />,
      title: "Genres",
      route: "genres",
    },
    {
      icon: <FileSpreadsheet size={20} />,
      title: "Categories",
      route: "categories",
    },
    {
      icon: <Store size={20} />,
      title: "Stores",
      route: "stores",
    },
    {
      icon: <Contact size={20} />,
      title: "Contact",
      route: "contacts",
    },
    {
      icon: <Package size={20} />,
      title: "Orders",
      route: "orders",
    },
    {
      icon: <User size={20} />,
      title: "Users",
      route: "users",
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
            <div className=" mx-8 my-8">
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
          </div>
        </div>
      </aside>
    </Drawer>
  );
};

export default Sidebar;
