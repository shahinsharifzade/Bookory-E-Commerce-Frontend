import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import VendorBookItem from "./VendorBookItem";
import { Pagination, Stack } from "@mui/material";
import { useGetById } from "../../../service/companyService";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

const VendorBooksList = ({ storeId }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetById(storeId);

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
      console.log(error?.response.data.statusCode === 404);
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
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
