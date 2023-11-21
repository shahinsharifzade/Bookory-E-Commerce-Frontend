import React, { useState } from "react";
import { Modal, TableCell, TableRow } from "@mui/material";
import { Eye, Pencil, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import UpdateCompanyForm from "../../Vendor/UpdateCompanyForm";
import { useUpdateCompany } from "../../../service/companyService";

const StoreItem = ({ store }) => {
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
                src={`https://localhost:7047/assets/images/companies/logo/${store.logo}`}
                className="aspect-[2.3/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
                alt="Store logo"
                s
              />
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell component="th" align="left" scope="row">
        {store.name}
      </TableCell>

      <TableCell component="th" align="left" scope="row">
        {store.contactEmail}
      </TableCell>

      <TableCell component="th" align="left" scope="row">
        {store.status === 0 && (
          <div className="rounded-3xl bg-yellow-500 px-4 py-4 text-center text-xl font-light text-white">
            Pending
          </div>
        )}
        {store.status === 1 && (
          <div className="rounded-3xl bg-green-500 px-4 py-4 text-center text-xl font-light text-white">
            Approved
          </div>
        )}
        {store.status === 2 && (
          <div className="rounded-3xl bg-red-500 px-4 py-4 text-center text-xl font-light text-white">
            Rejected
          </div>
        )}
      </TableCell>

      <TableCell component="th" align="right" scope="row">
        <div className="ml-auto mr-4 flex w-min gap-10">
          <Link to={`${store.id}`} className="cursor-pointer">
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
        <UpdateCompanyForm company={store} handleClose={handleClose} />
      </Modal>
    </TableRow>
  );
};

export default StoreItem;
