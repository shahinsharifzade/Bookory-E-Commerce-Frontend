import React, { useEffect } from "react";
import StoreListItem from "./StoreListItem";
import { useGetFilteredStores } from "../../../service/companyService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { Pagination, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumber } from "../../../features/companyFilter/companyFiltersSlice";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 3;

const StoreList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pageNumber = useSelector((state) => state.companyFilters.pageNumber);
  const search = useSelector((state) => state.companyFilters.search);
  const sortBy = useSelector((state) => state.companyFilters.sortBy);

  const { data, isLoading, isError, error } = useGetFilteredStores(
    pageNumber,
    PAGE_SIZE,
    search,
    sortBy,
  );

  // useEffect(() => {
  //   if (isError) {
  //     if (error?.response.data.statusCode === 404) navigate("notfound");
  //     console.log(error?.response.data.statusCode === 404);
  //   }
  // }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  return (
    <div className="container">
      <div className="flex">
        {data ? (
          data.companies.map((store, index) => (
            <StoreListItem store={store} key={index} />
          ))
        ) : (
          <div className="container flex flex-col items-center justify-center py-[15rem] text-[3rem] font-semibold text-secondartTextBold">
            <div>No store were found matching the provided criteria</div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center pb-8">
        {data && (
          <Stack spacing={3}>
            <Pagination
              count={data.totalCount}
              page={pageNumber}
              onChange={(_, page) => dispatch(setPageNumber(page))}
            />
          </Stack>
        )}
      </div>
    </div>
  );
};

export default StoreList;
