import React, { useEffect } from "react";
import Title from "../../../components/ui/Title/Title";
import { useGetBlogById } from "../../../service/blogService";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import BlogDetailsContent from "./BlogDetailsContent";

const BlogDetails = () => {
  const navigate = useNavigate();
  const blogId = useParams();
  const { data: blog, isLoading, isError, error } = useGetBlogById(blogId);

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  const categoryNames = blog.categories
    .map((category) => category.name)
    .join(" & ");

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  return (
    <section>
      <Title
        containerClasses={"bg-[#fff] py-8"}
        titleClasses={"hidden"}
        mainNav={"Home"}
        secondaryNav={categoryNames}
        lastNav={blog.title}
      />

      <BlogDetailsContent blog={blog} />
    </section>
  );
};

export default BlogDetails;
