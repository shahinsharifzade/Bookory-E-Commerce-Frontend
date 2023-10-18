import { format } from "date-fns";
import React from "react";

const BlogDetailsContent = ({ blog }) => {
  console.log(blog);
  const blogCategories = blog.categories.map((item) => item.name).join(" & ");
  const blogCreatedDate = format(new Date(blog.createdAt), "d MMMM yyyy");

  return (
    <div className="container">
      <div>
        <img
          src={`https://localhost:7047/assets/images/blogs/${blog.image}`}
          className="aspect-[2.3/1] h-full w-full cursor-pointer rounded-[2rem] object-cover"
        />
      </div>

      <div className="z-10 mx-auto minw-lg:relative minw-lg:mt-[-120px] minw-lg:max-w-[880px] min-[1300px]:max-w-[1090px]">
        <div className="rounded-[3rem] bg-white px-8 py-24 minw-lg:px-32">
          <div className="mb-4 flex flex-wrap gap-4 text-lg font-medium uppercase text-secondartTextBold">
            <p className="text-primaryText">{blogCategories} / </p>
            <p>{blogCreatedDate} / </p>
            <p>{blog.createBy} </p>
          </div>

          <div>
            <h1 className="mb-8 text-[3.6rem] font-semibold tracking-[-2px]">
              {blog.title}
            </h1>
          </div>

          <div className="text-xl font-light text-secondartTextBold">
            {blog.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsContent;
