import { Search } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../../features/blogFilter/blogFiltersSlice";

const BlogSearch = () => {
  const search = useSelector((state) => state.blogFilters.search);
  const dispatch = useDispatch();

  return (
    <div className="mb-12">
      <div className="rounded-[3rem] border border-solid border-secondaryText px-16 pb-16 pt-10">
        <p className="mx-[-40px] mb-12 border-b border-solid border-secondaryText px-16 pb-6 font-semibold">
          Search
        </p>

        <div className="flex border border-solid border-secondaryText px-8 py-4">
          <input
            className="placeholder-color:#000 h-8 py-6 text-xl font-medium text-black outline-none"
            placeholder="Search..."
            type="text"
            defaultValue={search}
            onChange={(e) => {
              dispatch(setSearch(e.target.value));
            }}
          />
          <Search />
        </div>
      </div>
    </div>
  );
};

export default BlogSearch;
