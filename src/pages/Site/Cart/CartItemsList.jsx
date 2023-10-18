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
import CartItem from "./CartItem";
import { useDispatch } from "react-redux";
import { setTotalPrice } from "../../../features/cart/cartSlice";

const CartItemsList = ({ basket }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    var total = 0;

    basket.map(
      (basketItem) =>
        (total +=
          parseFloat(basketItem.quantity) * parseFloat(basketItem.price)),
    );
    dispatch(setTotalPrice(total));
  }, [basket]);

  return (
    <div className="w-full">
      <TableContainer sx={{ minWidth: "100%" }} component={Paper}>
        <Table
          sx={{
            borderLeft: "0px",
            borderRight: "0px",
            borderSpacing: "0 15px",
          }}
        >
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
              <TableCell align="left">Product Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {basket &&
              basket.map((basketItem, index) => (
                <CartItem basketItem={basketItem} key={index} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CartItemsList;
