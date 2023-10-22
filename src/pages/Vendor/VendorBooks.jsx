import React, { useState, useEffect } from "react";
import {
  Modal,
  Pagination,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import VendorBookItem from "./VendorBookItem";
import LoadingSpinner from "../../components/ui/Loading/LoadingSpinner";
import { useGetByActiveVendor } from "../../service/companyService";
import AddBookForm from "../Admin/Books/AddBookForm";

const VendorBooks = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: company, isLoading } = useGetByActiveVendor();
  console.log(
    "🚀 ~ file: VendorBooks.jsx:47 ~ VendorBooks ~ company:",
    company,
  );

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <section className="mt-8">
      <div
        className="my-4 w-full cursor-pointer rounded-3xl bg-green-500 py-4 text-center text-white"
        onClick={handleOpen}
      >
        + Add New Book
      </div>

      <TableContainer sx={{ minWidth: "100%" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  fontSize: "16px",
                  background: "#999999",
                  fontFamily: "Sora",
                  color: "white",
                  borderRadius: "1px",
                },
              }}
            >
              <TableCell align="left">Product Name</TableCell>
              <TableCell align="left">Unit price</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {company.books.map((book, index) => (
              <VendorBookItem book={book} key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddBookForm handleClose={handleClose} />
      </Modal>
    </section>
  );
};

export default VendorBooks;
