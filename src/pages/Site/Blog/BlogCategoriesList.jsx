import { ChevronRight } from "lucide-react";
import React from "react";
import { useGetCategories } from "../../../service/categoryService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../../features/blogFilter/blogFiltersSlice";

const BlogCategoriesList = () => {
  const { data, isLoading } = useGetCategories();
  const category = useSelector((state) => state.blogFilters.category);
  const dispatch = useDispatch();

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const handleCategoryChange = (id) => {
    const updatedCategory = category.includes(id)
      ? category.filter((id) => id !== id)
      : [...category, id];

    dispatch(setCategory(updatedCategory));
  };
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  return (
    <div>
      <div className="rounded-[3rem] border border-solid border-secondaryText px-16 pb-16 pt-10">
        <p className="mx-[-40px] mb-12 border-b border-solid border-secondaryText px-16 pb-6 font-semibold">
          Categories
        </p>

        <div className="flex flex-col px-8 py-4 ">
          {data.map((item, index) => (
            <div key={index} className="mx-[-40px] mb-4 flex items-center">
              <div className="mr-4 rounded-full border border-solid border-secondaryText bg-secondaryText p-[2px]">
                <ChevronRight size={16} color="#fff" />
              </div>
              <p
                onClick={() => handleCategoryChange(item.id)}
                className={`cursor-pointer pt-[2px] text-xl font-normal hover:text-primaryText ${
                  category.includes(item.id)
                    ? "text-primaryText"
                    : "text-secondartTextBold "
                }`}
              >
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCategoriesList;
