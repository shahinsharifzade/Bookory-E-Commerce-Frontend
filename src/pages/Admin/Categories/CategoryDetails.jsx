import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import InfoDisplay from "../../../components/ui/InfoDisplay/InfoDisplay";
import { useGetCategoryById } from "../../../service/categoryService";

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const {
    data: category,
    isError,
    isLoading,
    error,
  } = useGetCategoryById(categoryId);

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <section className="my-8">
      <InfoDisplay label="Name " value={category.name} />
      <InfoDisplay label="Id" value={category.id} />
    </section>
  );
};

export default CategoryDetails;
