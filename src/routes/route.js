import Home from "../pages/Site/Home/Home";
import Shop from "../pages/Site/Shop/Shop";
import Author from "../pages/Site/Author/Author";
import SiteRoot from "../pages/Site/SiteRoot/SiteRoot";
import AuthorDetails from "../pages/Site/AuthorDetails/AuthorDetails";
import BookDetails from "../pages/Site/BookDetails/BookDetails";
import Store from "../pages/Site/Vendor/Store";
import VendorDetails from "../pages/Site/VendorDetails/VendorDetails";
import Blog from "../pages/Site/Blog/Blog";
import BlogDetails from "../pages/Site/BlogDetails/BlogDetails";
import Wishlist from "../pages/Site/Wishlist/Wishlist";

export const ROUTES = [
  {
    path: "/",
    element: <SiteRoot />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
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
        path: "shop/:bookId",
        element: <BookDetails />,
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
    ],
  },
];
