import React from "react";
import Title from "../../../components/ui/Title/Title";
import BlogItemsList from "./BlogItemsList";
import BlogSideBar from "./BlogSideBar";

const Blog = () => {
  return (
    <section>
      <Title
        title={"Blog"}
        mainNav={"Home"}
        secondaryNav={"Blog"}
        secondaryNavDisplay={"hidden"}
      />

      <div className="container mt-[6rem] flex justify-between">
        <BlogItemsList />
        <BlogSideBar />
      </div>
    </section>
  );
};

export default Blog;
