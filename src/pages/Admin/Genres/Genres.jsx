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
import { useGetAllGenres } from "../../../service/genreService";
import GenreItem from "./GenreItem";
import AddGenreForm from "./AddGenreForm";

const Genres = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isLoading } = useGetAllGenres();
  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  console.log("🚀 ~ file: Genres.jsx:19 ~ Genres ~ data:", data);

  return (
    <section className="mt-8 ">
      <div
        className="my-4 w-full cursor-pointer rounded-3xl bg-green-500 py-4 text-center text-white"
        onClick={handleOpen}
      >
        + Add New Genre
      </div>

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
              <TableCell align="center">Name</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data &&
              data.map((genre, index) => (
                <GenreItem genre={genre} key={index} />
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
        <AddGenreForm handleClose={handleClose} />
      </Modal>
    </section>
  );
};

export default Genres;
