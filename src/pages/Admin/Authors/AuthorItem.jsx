import React, { useState } from "react";
import { Modal, TableCell, TableRow } from "@mui/material";
import { Eye, Pencil, XCircle } from "lucide-react";
import { useDeleteAuthor } from "../../../service/authorService";
import UpdateAuthorForm from "./UpdateAuthorForm";
import { Link } from "react-router-dom";

const AuthorItem = ({ author }) => {
  const { mutate: deleteMutate } = useDeleteAuthor();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <TableCell component="th" scope="row">
        <div className="flex items-center">
          <div>
            <div className="w-[70px] shrink-0 rounded-[1rem]">
              <img
                src={`${process.env.REACT_APP_IMR_SRC}/assets/images/authors/${author.mainImage}`}
                className="aspect-[2.3/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
                alt="Author cover"
              />
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell component="th" align="center" scope="row">
        {author.name}
      </TableCell>

      <TableCell component="th" align="right" scope="row">
        <div className="ml-auto mr-4 flex w-min gap-10">
          <Link to={`${author.id}`} className="cursor-pointer">
            <Eye color="#1BA8F0" />
          </Link>
          <div className="cursor-pointer" onClick={handleOpen}>
            <Pencil color="orange" />
          </div>
          <div className="cursor-pointer">
            <XCircle color="red" onClick={() => deleteMutate(author.id)} />
          </div>
        </div>
      </TableCell>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UpdateAuthorForm author={author} handleClose={handleClose} />
      </Modal>
    </TableRow>
  );
};

export default AuthorItem;
