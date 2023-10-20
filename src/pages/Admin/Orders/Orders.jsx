import React, { useState } from "react";
import {
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { useGetAllOrders } from "../../../service/orderService";
import OrderItem from "./OrderItem";

const Orders = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isLoading } = useGetAllOrders();
  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  console.log("🚀 ~ file: Genres.jsx:19 ~ Genres ~ data:", data);

  return (
    <section className="mt-8 ">
      <TableContainer sx={{ minWidth: "100%" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  fontSize: "16px",
                  background: "#B2BEB5",
                  fontFamily: "Sora",
                  color: "white",
                  borderRadius: "1px",
                },
              }}
            >
              <TableCell align="left">Email</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Basket Total</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data &&
              data.map((order, index) => (
                <OrderItem order={order} key={index} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default Orders;
