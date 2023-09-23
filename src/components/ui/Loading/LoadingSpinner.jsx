import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = ({ isLoading }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "rgba(0, 0, 0, 0.2)",
      }}
      open={isLoading}
    >
      <CircularProgress color="primary" size={40} />
    </Backdrop>
  );
};

export default LoadingSpinner;
