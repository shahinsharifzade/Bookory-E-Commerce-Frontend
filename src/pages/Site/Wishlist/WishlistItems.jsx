import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { useGetWishlist } from "../../../service/wishlistService";
import WishlistItem from "./WishlistItem";
import React, { useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const WishlistItems = () => {
  const { data: wishlist, isLoading, isError, error } = useGetWishlist();

  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
      console.log(error?.response.data.statusCode === 404);
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <div className="container mb-16 mt-24 overflow-x-hidden">
      <TableContainer sx={{ minWidth: "100%" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  fontSize: "16px",
                  background: "#e6e6e6",
                  fontFamily: "Sora",
                  color: "white",
                  borderRadius: "1px",
                },
              }}
            >
              <TableCell align="center">Product Name</TableCell>
              <TableCell align="center">Unit price</TableCell>
              <TableCell align="center">Stock Status</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {wishlist !== undefined &&
              wishlist.books.map((book, index) => (
                <WishlistItem book={book} key={index} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WishlistItems;
