import React, { useState } from "react";
import { Modal, TableCell, TableRow } from "@mui/material";
import { Eye, Pencil, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const OrderItem = ({ order }) => {
  const [open, setOpen] = useState(false);

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        "& .MuiTableCell-root": {
          fontSize: "16px",
          fontFamily: "Sora",
          borderRadius: "1px",
        },
      }}
    >
      <TableCell component="th" align="left" scope="row">
        {order.user.email}
      </TableCell>

      <TableCell component="th" align="center" scope="row">
        {order.user.userName}
      </TableCell>

      <TableCell component="th" align="center" scope="row">
        {order.total} $
      </TableCell>

      <TableCell component="th" align="right" scope="row">
        <div className="ml-auto mr-4 flex w-min gap-10">
          <Link to={`${order.id}`} className="cursor-pointer">
            <Eye color="#1BA8F0" />
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default OrderItem;
