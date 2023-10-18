import React from "react";
import BlogSearch from "./BlogSearch";
import BlogCategoriesList from "./BlogCategoriesList";
import BlogRecentPost from "./BlogRecentPost";

const BlogSideBar = () => {
  return (
    <div className="flex flex-col max-minw-md:max-w-[220px]">
      <BlogSearch />
      <BlogCategoriesList />
      <BlogRecentPost />
    </div>
  );
};

export default BlogSideBar;
