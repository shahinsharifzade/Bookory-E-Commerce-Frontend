import Home from "../pages/Site/Home/Home";
import SiteRoot from "../pages/Site/SiteRoot/SiteRoot";

export const ROUTES = [
  {
    path: "/",
    element: <SiteRoot />,
    childeren: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
];
