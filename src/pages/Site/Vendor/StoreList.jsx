import React from "react";
import StoreListItem from "./StoreListItem";
import { useGetFilteredStores } from "../../../service/companyService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { Pagination, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumber } from "../../../features/companyFilter/companyFiltersSlice";

const PAGE_SIZE = 3;

const StoreList = () => {
  const dispatch = useDispatch();

  const pageNumber = useSelector((state) => state.companyFilters.pageNumber);
  const search = useSelector((state) => state.companyFilters.search);
  const sortBy = useSelector((state) => state.companyFilters.sortBy);

  const { data, isLoading } = useGetFilteredStores(
    pageNumber,
    PAGE_SIZE,
    search,
    sortBy,
  );
  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <div className="container">
      <div className="flex">
        {data.companies.map((store, index) => (
          <StoreListItem store={store} key={index} />
        ))}
      </div>

      <div className="flex items-center justify-center pb-8">
        <Stack spacing={3}>
          <Pagination
            count={data.totalCount}
            page={pageNumber}
            onChange={(_, page) => dispatch(setPageNumber(page))}
          />
        </Stack>
      </div>
    </div>
  );
};

export default StoreList;
