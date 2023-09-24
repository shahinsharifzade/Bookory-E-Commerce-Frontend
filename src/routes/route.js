import Home from "../pages/Site/Home/Home";
import Shop from "../pages/Site/Shop/Shop";
import SiteRoot from "../pages/Site/SiteRoot/SiteRoot";

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
    ],
  },
];
