import React, { useState, useEffect } from "react";
import {
  Modal,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddBookForm from "./AddBookForm";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import {
  useGetFilteredBooks,
  useGetPendingOrRejectedBooks,
} from "../../../service/bookService";
import BookItem from "./BookItem";

const PAGE_SIZE = 20;
const Books = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [approvedBooks, setApprovedBooks] = useState([]);
  const [pendingOrRejectedBooks, setPendingOrRejectedBooks] = useState([]);

  const { data: filteredBooks, isLoading: loadingFilteredBooks } =
    useGetFilteredBooks(pageNumber, PAGE_SIZE);

  const { data: pendingOrRejected, isLoading: loadingPendingOrRejected } =
    useGetPendingOrRejectedBooks();

  useEffect(() => {
    if (!loadingFilteredBooks && !loadingPendingOrRejected) {
      setApprovedBooks(filteredBooks.books);
      setPendingOrRejectedBooks(pendingOrRejected);
      setSelectedBooks(filteredBooks.books);
      setIsLoading(false);
    }
  }, [
    filteredBooks,
    pendingOrRejected,
    loadingFilteredBooks,
    loadingPendingOrRejected,
  ]);

  const displayApprovedBooks = () => {
    setSelectedBooks(approvedBooks);
  };

  const displayPendingRejectedBooks = () => {
    setSelectedBooks(pendingOrRejectedBooks);
  };

  if (isLoading || loadingFilteredBooks || loadingPendingOrRejected) {
    return (
      <LoadingSpinner
        isLoading={
          isLoading || loadingFilteredBooks || loadingPendingOrRejected
        }
      />
    );
  }

  return (
    <section className="mt-8">
      <div
        className="my-4 w-full cursor-pointer rounded-3xl bg-green-500 py-4 text-center text-white"
        onClick={handleOpen}
      >
        + Add New Book
      </div>

      <div className="flex gap-4">
        <div
          className="my-4 w-full cursor-pointer rounded-3xl bg-green-500 py-4 text-center text-white"
          onClick={displayApprovedBooks}
        >
          Approved Books
        </div>

        <div
          className="my-4 w-full cursor-pointer rounded-3xl bg-red-500 py-4 text-center text-white"
          onClick={displayPendingRejectedBooks}
        >
          Pending & Rejected Books
        </div>
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
            {selectedBooks.map((book, index) => (
              <BookItem book={book} key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={`my-8 flex items-center justify-center`}>
        <Stack spacing={3}>
          <Pagination
            count={filteredBooks.totalCount}
            page={pageNumber}
            onChange={(_, page) => setPageNumber(page)}
          />
        </Stack>
      </div>

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

export default Books;
