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
import React, { useState } from "react";
import { useGetCategories } from "../../../service/categoryService";
import AddCategoryForm from "./AddCategoryForm";
import CategoryItem from "./CategoryItem";

const Categories = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isLoading } = useGetCategories();
  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  console.log(
    "🚀 ~ file: useGetCategories.jsx:19 ~ useGetCategories ~ data:",
    data,
  );

  return (
    <section className="mt-8 ">
      <div
        className="my-4 w-full cursor-pointer rounded-3xl bg-green-500 py-4 text-center text-white"
        onClick={handleOpen}
      >
        + Add New Category
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
              data.map((category, index) => (
                <CategoryItem category={category} key={index} />
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
        <AddCategoryForm handleClose={handleClose} />
      </Modal>
    </section>
  );
};

export default Categories;
