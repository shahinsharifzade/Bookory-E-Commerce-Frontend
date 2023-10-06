import React, { useState } from "react";
import { useGetFilteredBooks } from "../../../service/bookService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { useSelector } from "react-redux";
import VendorBookItem from "./VendorBookItem";
import { Pagination, Stack } from "@mui/material";

const PAGE_SIZE = 10;

const VendorBooksList = ({ storeId }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const search = useSelector((state) => state.companyBookFilters.search);
  const sortBy = useSelector((state) => state.companyBookFilters.selectedSort);

  const { data, isLoading, isError } = useGetFilteredBooks(
    pageNumber,
    PAGE_SIZE,
    undefined,
    undefined,
    undefined,
    undefined,
    sortBy,
    search,
    storeId,
  );

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap">
        {data.books.map((book, index) => (
          <VendorBookItem book={book} key={index} />
        ))}
      </div>

      <div className="flex items-center justify-center pb-8">
        <Stack spacing={3}>
          <Pagination
            count={data.totalCount}
            page={pageNumber}
            onChange={(_, page) => setPageNumber(page)}
          />
        </Stack>
      </div>
    </div>
  );
};

export default VendorBooksList;
