import SiteRoot from "../pages/Site/SiteRoot/SiteRoot";

import AuthorDetails from "../pages/Site/AuthorDetails/AuthorDetails";
import VendorDetails from "../pages/Site/VendorDetails/VendorDetails";
import BookDetails from "../pages/Site/BookDetails/BookDetails";
import BlogDetails from "../pages/Site/BlogDetails/BlogDetails";
import LoginForm from "../components/form/Login/LoginForm";
import Wishlist from "../pages/Site/Wishlist/Wishlist";
import Contact from "../pages/Site/Contact/Contact";
import Author from "../pages/Site/Author/Author";
import Store from "../pages/Site/Vendor/Store";
import Home from "../pages/Site/Home/Home";
import Shop from "../pages/Site/Shop/Shop";
import Blog from "../pages/Site/Blog/Blog";
import Cart from "../pages/Site/Cart/Cart";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import RegisterForm from "../components/form/Register/RegisterForm";

// const checkUser = () => {
//   const token = JSON.parse(localStorage.getItem("token"));
//   if (token) {
//     return null;
//   } else {
//     return redirect("/login");
//   }
// };

export const ROUTES = [
  {
    path: "/",
    element: <SiteRoot />,
    children: [
      {
        index: true,
        element: <Home />,
        // loader: checkUser,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "shop/:bookId",
        element: <BookDetails />,
      },
      {
        path: "author",
        element: <Author />,
      },
      {
        path: "author/:authorId",
        element: <AuthorDetails />,
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "store/:storeId",
        element: <VendorDetails />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:blogId",
        element: <BlogDetails />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
];
