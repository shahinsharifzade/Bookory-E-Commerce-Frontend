import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const BlogItem = ({ blog }) => {
  const date = format(new Date(blog.createdAt), "d MMMM yyyy");

  return (
    <>
      {blog && (
        <div className="mb-[6rem]">
          {/* <Link to={`blog/${blog.id}`}> */}
          <div className="min-[1300px]:w-min">
            <div className="minw-md:w-full min-[1300px]:w-[820px]">
              <img
                src={`${process.env.REACT_APP_IMR_SRC}/assets/images/blogs/${blog.image}`}
                className="aspect-[2/1] h-full w-full cursor-pointer rounded-[2rem] object-cover"
              />
            </div>
            <div className="my-4 flex flex-wrap items-center text-lg font-normal text-secondartTextBold">
              <p>{date}</p>
              <p>BY HUONGDO</p>
            </div>

            <div>
              <Link to={`/blog/${blog.id}`}>
                <h2 className="mb-4 cursor-pointer flex-wrap text-[2.8rem] font-semibold hover:text-primaryText">
                  {blog.title}
                </h2>
              </Link>
            </div>

            <div>
              <p className="line-clamp-3 overflow-hidden text-xl font-normal text-secondartTextBold">
                {blog.content}
              </p>
            </div>

            <div className="my-6 border border-solid border-secondaryText"></div>

            <div className="flex items-center justify-between text-xl">
              <div className="flex text-secondaryText">
                IN
                <span className="cursor-pointer pl-2 font-normal uppercase text-primaryText">
                  {blog.categories.map((category) => category.name).join(" & ")}
                </span>
              </div>
              <Link to={`/blog/${blog.id}`}>
                <div className="flex items-center transition-all duration-300 hover:text-primaryText">
                  <p className=" cursor-pointer  ">Read More</p>
                  <ChevronRight size={18} />
                </div>
              </Link>
            </div>
          </div>
          {/* </Link> */}
        </div>
      )}
    </>
  );
};

export default BlogItem;
