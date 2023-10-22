import React, { useEffect, useState } from "react";
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
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import StoreItem from "./StoreItem";
import {
  useGetFilteredStores,
  useGetPendingOrRejectedCompanies,
} from "../../../service/companyService";

const Stores = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { data: approvedStores, isLoading: loadingApprovedStores } =
    useGetFilteredStores(1, 20);
  const {
    data: pendingOrRejectedStores,
    isLoading: loadingPendingOrRejectedStores,
  } = useGetPendingOrRejectedCompanies();

  const [selectedStores, setSelectedStores] = useState(approvedStores);

  const displayApprovedStores = () => {
    setSelectedStores(approvedStores.companies);
  };

  const displayPendingRejectedStores = () => {
    setSelectedStores(pendingOrRejectedStores);
  };

  useEffect(() => {
    if (loadingApprovedStores || loadingPendingOrRejectedStores) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setSelectedStores(approvedStores.companies);
    }
  }, [loadingApprovedStores, loadingPendingOrRejectedStores || isLoading]);

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (isLoading || loadingApprovedStores || loadingPendingOrRejectedStores) {
    return (
      <LoadingSpinner
        isLoading={
          isLoading || loadingApprovedStores || loadingPendingOrRejectedStores
        }
      />
    );
  }

  return (
    <section className="mt-8 ">
      <div className="flex gap-4">
        <div
          className="my-4 w-full cursor-pointer rounded-3xl bg-green-500 py-4 text-center text-white"
          onClick={displayApprovedStores}
        >
          Approved Stores
        </div>

        <div
          className="my-4 w-full cursor-pointer rounded-3xl bg-red-500 py-4 text-center text-white"
          onClick={displayPendingRejectedStores}
        >
          Pending & Rejected Stores
        </div>
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
              <TableCell align="left">Logo</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {selectedStores &&
              selectedStores.map((store, index) => (
                <StoreItem store={store} key={index} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={`my-8 flex items-center justify-center`}>
        <Stack spacing={3}>
          <Pagination
            count={approvedStores.totalCount}
            page={pageNumber}
            onChange={(_, page) => setPageNumber(page)}
          />
        </Stack>
      </div>

      {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AddGenreForm handleClose={handleClose} />
        </Modal> */}
    </section>
  );
};

export default Stores;
