import Home from "../pages/Site/Home/Home";
import Shop from "../pages/Site/Shop/Shop";
import Author from "../pages/Site/Author/Author";
import SiteRoot from "../pages/Site/SiteRoot/SiteRoot";
import AuthorDetails from "../pages/Site/AuthorDetails/AuthorDetails";

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
        // children: [
        //   {
        //     path: ":authorId",
        //     element: <AuthorDetails />,
        //   },
        // ],
      },
      {
        path: "author/:authorId",
        element: <AuthorDetails />,
      },
    ],
  },
];
