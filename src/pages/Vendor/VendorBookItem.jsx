import React, { useState } from "react";
import { Modal, TableCell, TableRow } from "@mui/material";
import { Eye, Pencil, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/ui/Loading/LoadingSpinner";
import { useDeleteBook } from "../../service/bookService";
import UpdateBookForm from "../Admin/Books/UpdateBookForm";

const VendorBookItem = ({ book }) => {
  const { mutate: deleteMutate, isLoading } = useDeleteBook();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

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
        {book.title}
      </TableCell>

      <TableCell component="th" align="left" scope="row">
        <div className="flex gap-2">
          <p className="mt-4 text-[18px] font-medium text-primaryText">
            {book && book.price - (book.price * book.discountPercentage) / 100}$
          </p>
          <p
            className={`self-end text-xl font-medium line-through ${
              book.discountPercentage === 0 ? "hidden" : ""
            }`}
          >
            {book.discountPercentage && book.price}$
          </p>
        </div>
      </TableCell>

      <TableCell component="th" align="left" scope="row">
        {book.status === 1 && (
          <div className="rounded-3xl bg-yellow-500 px-2 py-4 text-center text-xl font-light text-white">
            Pending...
          </div>
        )}
        {book.status === 0 && (
          <div className="rounded-3xl bg-green-500 px-4 py-4 text-center text-xl font-light text-white">
            Approved
          </div>
        )}
        {book.status === 2 && (
          <div className="rounded-3xl bg-red-500 px-4 py-4 text-center text-xl font-light text-white">
            Rejected
          </div>
        )}
      </TableCell>

      <TableCell component="th" align="right" scope="row">
        <div className="ml-auto mr-4 flex w-min gap-10">
          <Link to={`${book.id}`} className="cursor-pointer">
            <Eye color="#1BA8F0" />
          </Link>
          <div className="cursor-pointer" onClick={handleOpen}>
            <Pencil color="orange" />
          </div>
          <div className="cursor-pointer">
            <XCircle color="red" onClick={() => deleteMutate(book.id)} />
          </div>
        </div>
      </TableCell>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UpdateBookForm book={book} handleClose={handleClose} />
      </Modal>
    </TableRow>
  );
};

export default VendorBookItem;
