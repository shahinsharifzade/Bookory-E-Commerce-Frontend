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
import { Pagination, Stack } from "@mui/material";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import AddBlogForm from "./AddBlogForm";
import BlogItem from "./BlogItem";
import { useGetFilteredBlogs } from "../../../service/blogService";

const Blogs = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isLoading } = useGetFilteredBlogs(pageNumber, 20);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  console.log("🚀 ~ file: Blogs.jsx:25 ~ Blogs ~ data:", data);

  return (
    <section className="mt-8 ">
      <div
        className="my-4 w-full cursor-pointer rounded-3xl bg-green-500 py-4 text-center text-white"
        onClick={handleOpen}
      >
        + Add New Blog
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
              <TableCell align="center">Image</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data &&
              data.blogs.map((blog, index) => (
                <BlogItem blog={blog} key={index} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={`my-8 flex items-center justify-center`}>
        <Stack spacing={3}>
          <Pagination
            // count={data.totalCount}
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
        <AddBlogForm handleClose={handleClose} />
      </Modal>
    </section>
  );
};

export default Blogs;
