import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import { useGetFilteredBlogs } from "../../../service/blogService";
import { Pagination, Stack } from "@mui/material";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BlogItemsList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();

  const search = useSelector((state) => state.blogFilters.search);
  const category = useSelector((state) => state.blogFilters.category);

  const { data, isLoading, isError, error } = useGetFilteredBlogs(
    pageNumber,
    3,
    category,
    undefined,
    search,
  );

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
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
