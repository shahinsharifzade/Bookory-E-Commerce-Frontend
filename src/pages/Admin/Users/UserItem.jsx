import React, { useState } from "react";
import { Modal, TableCell, TableRow } from "@mui/material";
import { Eye, Pencil, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import UpdateBookForm from "../Books/UpdateBookForm";
import UpdateUser from "./UpdateUser";
import { useGetUserById } from "../../../service/userService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";

const UserItem = ({ userValue }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data: user, isLoading } = useGetUserById(userValue.id);
  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  console.log("🚀 ~ file: UserItem.jsx:16 ~ UserItem ~ user:", user);

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
        {user.user.userName}
      </TableCell>

      <TableCell component="th" align="left" scope="row">
        {user.user.email}
      </TableCell>

      <TableCell component="th" align="right" scope="row">
        <div className="ml-auto mr-4 flex w-min gap-10">
          <Link to={`${user.user.id}`} className="cursor-pointer">
            <Eye color="#1BA8F0" />
          </Link>
          <div className="cursor-pointer" onClick={handleOpen}>
            <Pencil color="orange" />
          </div>
        </div>
      </TableCell>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UpdateUser user={user} handleClose={handleClose} />
      </Modal>
    </TableRow>
  );
};

export default UserItem;
