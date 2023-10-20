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
import ForgotPassword from "../components/form/ForgotPassword/ForgotPassword";
import ResetPassword from "../components/form/ResetPassword/ResetPassword";
import CompanyRegisterForm from "../components/form/CompanyRegisterForm/CompanyRegisterForm";
import EmailConfirmation from "../pages/Site/EmailConfirmation/EmailConfirmation";
import NotFoundPage from "../pages/Site/ExceptionPages/NotFoundPage";
import AdminRoot from "../pages/Admin/AdminRoot/AdminRoot";
import PrivateRoute from "../pages/Admin/PrivateRoute/PrivateRoute";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import StripePayment from "../components/ui/StripePayment/StripePayment";
import Address from "../pages/Site/Address/Address";
import Books from "../pages/Admin/Books/Books";
import Authors from "../pages/Admin/Authors/Authors";
import AuthorDetailsView from "../pages/Admin/Authors/AuthorDetailsView";
import Genres from "../pages/Admin/Genres/Genres";
import GenreDetailsView from "../pages/Admin/Genres/GenreDetailsView";
import Categories from "../pages/Admin/Categories/Categories";
import CategoryDetails from "../pages/Admin/Categories/CategoryDetails";
import Orders from "../pages/Admin/Orders/Orders";
import OrderDetails from "../pages/Admin/Orders/OrderDetails";
import Users from "../pages/Admin/Users/Users";
import UserDetails from "../pages/Admin/Users/UserDetails";
import Contacts from "../pages/Admin/Contact/Contacts";
import ContactDetails from "../pages/Admin/Contact/ContactDetails";

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
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "api/Auth/ChangePassword",
        element: <ResetPassword />,
      },
      {
        path: "api/Auth/Verify",
        element: <EmailConfirmation />,
      },
      {
        path: "companyregister",
        element: <CompanyRegisterForm />,
      },
      {
        path: "notfound",
        element: <NotFoundPage />,
      },

      {
        path: "checkout",
        element: <StripePayment />,
      },
      {
        path: "address",
        element: <Address />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <PrivateRoute roles={["Admin", "Moderator"]}>
        <AdminRoot />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "authors",
        element: <Authors />,
      },
      {
        path: "authors/:authorId",
        element: <AuthorDetailsView />,
      },
      {
        path: "genres",
        element: <Genres />,
      },
      {
        path: "genres/:genreId",
        element: <GenreDetailsView />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "categories/:categoryId",
        element: <CategoryDetails />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/:orderId",
        element: <OrderDetails />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/:userId",
        element: <UserDetails />,
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "contacts/:contactId",
        element: <ContactDetails />,
      },
    ],
  },
];
