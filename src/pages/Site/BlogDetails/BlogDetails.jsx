import React from "react";
import Title from "../../../components/ui/Title/Title";
import { useGetBlogById } from "../../../service/blogService";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import BlogDetailsContent from "./BlogDetailsContent";

const BlogDetails = () => {
  const blogId = useParams();
  console.log("🚀 ~ file: BlogDetails.jsx:8 ~ BlogDetails ~ blogId:", blogId);
  const { data: blog, isLoading, isError } = useGetBlogById(blogId);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  if (isError) return <div></div>;

  const categoryNames = blog.categories
    .map((category) => category.name)
    .join(" & ");

  console.log("🚀 ~ file: BlogDetails.jsx:11 ~ BlogDetails ~ blog:", blog);

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
