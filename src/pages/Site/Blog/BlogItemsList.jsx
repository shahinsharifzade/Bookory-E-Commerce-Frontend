import React, { useState } from "react";
import BlogItem from "./BlogItem";
import { useGetFilteredBlogs } from "../../../service/blogService";
import { Pagination, Stack } from "@mui/material";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { useSelector } from "react-redux";

const BlogItemsList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const search = useSelector((state) => state.blogFilters.search);
  const category = useSelector((state) => state.blogFilters.category);

  const { data, isLoading, isError } = useGetFilteredBlogs(
    pageNumber,
    3,
    category,
    undefined,
    search,
  );

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  if (isError) return <div></div>;

  return (
    <div className="flex flex-col">
      <div>
        {data.blogs.map((item, index) => (
          <div key={index} className="flex flex-col">
            <BlogItem blog={item} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center pb-8">
        <Stack spacing={1}>
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

export default BlogItemsList;
