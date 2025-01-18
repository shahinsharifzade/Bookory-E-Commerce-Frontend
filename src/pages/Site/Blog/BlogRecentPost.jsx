import React, { useEffect } from "react";
import { useGetFilteredBlogs } from "../../../service/blogService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

const BlogRecentPost = () => {
  const sortBy = useSelector((state) => state.blogFilters.sortBy);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetFilteredBlogs(
    1,
    5,
    undefined,
    sortBy,
  );

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  return (
    <div className="mt-12  max-w-[360px] rounded-[3rem] border border-solid border-secondaryText px-16 pb-16 pt-10">
      <p className="mx-[-40px] mb-12 border-b border-solid border-secondaryText px-16 pb-6 font-semibold">
        Recent Post
      </p>

      <ul className="flex flex-col px-8 py-4">
        {data.blogs.map((item, index) => (
          <li key={index} className="mx-[-40px] mb-12 flex">
            <div className="mr-8 w-1/4">
              <div className="cursor-pointer">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/assets/images/blogs/${item.image}`}
                  className="aspect-[1/1] h-full w-full rounded-[2rem] object-cover"
                />
              </div>
            </div>

            <div className="w-3/4">
              <p className="text-lg font-normal text-secondartTextBold">
                {format(new Date(item.createdAt), "d MMMM yyyy")}
              </p>
              <p className="text-xl font-medium ">
                <Link to={`/blog/${item.id}`}>{item.title}</Link>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogRecentPost;
