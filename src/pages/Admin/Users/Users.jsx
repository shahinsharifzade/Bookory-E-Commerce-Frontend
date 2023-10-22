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
import { useGetAllUsers } from "../../../service/userService";
import UserItem from "./UserItem";

const Users = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isLoading } = useGetAllUsers();
  console.log("🚀 ~ file: Users.jsx:22 ~ Users ~ data:", data);
  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <section className="mt-8 ">
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
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data &&
              data.map((user, index) => (
                <UserItem userValue={user} key={index} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default Users;
