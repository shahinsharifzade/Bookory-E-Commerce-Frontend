import React, { useState } from "react";
import { Modal, TableCell, TableRow } from "@mui/material";
import { Eye, Pencil, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeleteGenre } from "../../../service/genreService";
import UpdateGenreForm from "./UpdateGenreForm";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";

const GenreItem = ({ genre }) => {
  const { mutate: deleteMutate, isLoading } = useDeleteGenre();
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
      <TableCell component="th" align="center" scope="row">
        {genre.name}
      </TableCell>

      <TableCell component="th" align="right" scope="row">
        <div className="ml-auto mr-4 flex w-min gap-10">
          <Link to={`${genre.id}`} className="cursor-pointer">
            <Eye color="#1BA8F0" />
          </Link>
          <div className="cursor-pointer" onClick={handleOpen}>
            <Pencil color="orange" />
          </div>
          <div className="cursor-pointer">
            <XCircle color="red" onClick={() => deleteMutate(genre.id)} />
          </div>
        </div>
      </TableCell>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UpdateGenreForm genre={genre} handleClose={handleClose} />
      </Modal>
    </TableRow>
  );
};

export default GenreItem;
