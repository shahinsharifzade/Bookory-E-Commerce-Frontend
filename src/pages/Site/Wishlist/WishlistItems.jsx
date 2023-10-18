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

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  if (!wishlist || wishlist.length === 0)
    return (
      <div className="container flex flex-col items-center justify-center py-[15rem] text-[3rem] font-semibold text-secondartTextBold">
        <div>Your Wishlist is Empty</div>
        <button
          className="mx-auto my-12 flex items-center rounded-[2rem] bg-primaryText px-16 py-6 text-xl text-white active:scale-95 active:shadow-xl"
          onClick={() => navigate("/shop")}
        >
          Back to Shop page
        </button>
      </div>
    );

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
            {wishlist &&
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
