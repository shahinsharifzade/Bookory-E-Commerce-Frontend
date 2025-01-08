import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

import { ROUTES } from "./routes/route";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

import { Provider } from "react-redux";
import { store } from "./app/store";

// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

const router = createBrowserRouter(ROUTES);
const queryClient = new QueryClient();

// const stripePromise = loadStripe(
//   "pk_test_51Nn1IUDU36UGP8uCILpcQwRVDL8KWaqrULBx2AE1SWvZIhwJ3isdTWpxa29c2iXVgu2FsBR77BqVk7NOp13e5jdT0089oN5GnB",
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {/* <Elements stripe={stripePromise}> */}
        <App>
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer />
        </App>
        {/* </Elements> */}
      </Provider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </React.StrictMode>,
);
