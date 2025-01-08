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
import RegisterForm from "../components/form/Register/RegisterForm";
import ForgotPassword from "../components/form/ForgotPassword/ForgotPassword";
import ResetPassword from "../components/form/ResetPassword/ResetPassword";
import CompanyRegisterForm from "../components/form/CompanyRegisterForm/CompanyRegisterForm";
import EmailConfirmation from "../pages/Site/EmailConfirmation/EmailConfirmation";
import NotFoundPage from "../pages/Site/ExceptionPages/NotFoundPage";
import AdminRoot from "../pages/Admin/AdminRoot/AdminRoot";
import PrivateRoute from "../pages/Admin/PrivateRoute/PrivateRoute";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
// import StripePayment from "../components/ui/StripePayment/StripePayment";
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
import StoreDetails from "../pages/Admin/Stores/StoreDetails";
import Stores from "../pages/Admin/Stores/Stores";
import BookDetailsView from "../pages/Admin/Books/BookDetailsView";
import Aboutus from "../pages/Site/AboutUs/Aboutus";
import Blogs from "../pages/Admin/Blogs/Blogs";
import BlogDetailsView from "../pages/Admin/Blogs/BlogDetailsView";
import VendorRoot from "../pages/Vendor/VendorRoot/VendorRoot";
import VendorBooks from "../pages/Vendor/VendorBooks";
import VendorBookDetails from "../pages/Vendor/VendorBookDetails";
import VendorStoreDetails from "../pages/Vendor/StoreDetails";
import UpdateCompanyForm from "../pages/Vendor/UpdateCompanyForm";
import SuccessMessage from "../components/ui/SuccessPage/SuccessMessage";
import { checkUser } from "../utils/checkUser";
import { Navigate } from "react-router-dom";

export const ROUTES = [
  {
    path: "/",
    element: <SiteRoot />,
    children: [
      {
        index: true,
        element: <Home />,
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
        path: "register/companyregister",
        element: <CompanyRegisterForm />,
      },
      {
        path: "notfound",
        element: <NotFoundPage />,
      },

      // {
      //   path: "checkout",
      //   element: <StripePayment />,
      // },
      {
        path: "address",
        element: <Address />,
        loader: checkUser,
      },
      {
        path: "aboutus",
        element: <Aboutus />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "successmessage",
        element: <SuccessMessage />,
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
        path: "books/:bookId",
        element: <BookDetailsView />,
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
      {
        path: "stores",
        element: <Stores />,
      },
      {
        path: "stores/:storeId",
        element: <StoreDetails />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "blogs/:blogId",
        element: <BlogDetailsView />,
      },
    ],
  },
  {
    path: "vendor",
    element: (
      <PrivateRoute roles={["Admin", "Moderator", "Vendor"]}>
        <VendorRoot />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "books",
        element: <VendorBooks />,
      },
      {
        path: "books/:bookId",
        element: <VendorBookDetails />,
      },
      {
        path: "storedetails",
        element: <VendorStoreDetails />,
      },
    ],
  },
];
