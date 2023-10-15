import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

const PrivateRoute = ({ roles, children }) => {
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem("token"));

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else {
    const decodedToken = jwtDecode(token.token);
    const userRole =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];

    if (roles.includes(userRole)) return children;
    else return <Navigate to="/notfound" />;
  }
};

export default PrivateRoute;
