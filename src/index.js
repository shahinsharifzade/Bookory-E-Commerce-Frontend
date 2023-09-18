import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

import { ROUTES } from "./routes/route";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter(ROUTES);
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App>
        <RouterProvider router={router}></RouterProvider>
      </App>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
);
