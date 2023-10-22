import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { setResponseErrorMessage } from "../../../utils/setResponseErrorMessages";
import Input from "../../../components/ui/FormInput/Input";
import React, { useState } from "react";
import * as yup from "yup";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import ResponseErrorMessage from "../../../components/ui/ResponseMessage/ResponseErrorMessage";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ArrowBigDown } from "lucide-react";
import { useAddBlog } from "../../../service/blogService";
import { useGetCategories } from "../../../service/categoryService";

const AddBlogForm = ({ handleClose }) => {
  const [responseErrors, setResponseErrors] = useState({});
  const [responseException, setResponseException] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const schema = yup.object().shape({
    title: yup.string().required().max(200),
    content: yup.string().required().max(2000),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading: loadingMutate } = useAddBlog();
  const { data: categories, isLoading: loadingCategories } = useGetCategories();
  console.log(
    "🚀 ~ file: AddBlogForm.jsx:36 ~ AddBlogForm ~ categories:",
    categories,
  );

  const onSubmit = (formData) => {
    console.log(
      "🚀 ~ file: AddBookForm.jsx:35 ~ onSubmit ~ formData:",
      formData,
    );
    setResponseErrors({});

    mutate(formData, {
      onSuccess: () => {
        handleClose();
      },

      onError: (res) => {
        if (res.response.data.errors) {
          const errorsData = setResponseErrorMessage(res.response.data.errors);
          setResponseErrors(errorsData);
        }

        if (res.response.data.statusCode === 409)
          setResponseException(res.response.data.message);
      },
    });
  };
  if (loadingMutate || loadingCategories)
    return <LoadingSpinner isLoading={loadingMutate || loadingCategories} />;

  return (
    <>
      <div
        className="container z-10 mb-16 mt-32 max-w-[600px] rounded-[3rem] bg-white py-8 scrollbar-none"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <h2 className="pb-8 text-center text-[4rem] text-black">Add Blog</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-[20px]"
        >
          <div>
            <Input
              name="title"
              register={register}
              placeholder="Title"
              type="text"
              error={errors.title}
              responseError={responseErrors.Title}
            />

            <Input
              name="content"
              register={register}
              placeholder="Content"
              type="text"
              error={errors.content}
              responseError={responseErrors.Content}
            />

            <Accordion
              sx={{
                borderRadius: "20px",
                marginBottom: "17px",
              }}
            >
              <AccordionSummary
                expandIcon={<ArrowBigDown />}
                sx={{
                  "&.MuiAccordion-root:before": {
                    height: "0px",
                  },
                  fontSize: "16px",
                }}
              >
                <h2 className="ml-4 text-secondartTextBold">Categories</h2>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-wrap items-center justify-center gap-8">
                  {categories &&
                    categories.map((category) => {
                      return (
                        <div className="flex">
                          <label htmlFor={category.id}>
                            <Input
                              name="categoryids"
                              register={register}
                              placeholder="Genres"
                              type="checkbox"
                              error={errors.categoryIds}
                              y
                              responseError={responseErrors.CategorIds}
                              inputValue={category.id}
                              id={category.id}
                            />
                            <p className="text-lg font-medium">
                              {category.name}
                            </p>
                          </label>
                        </div>
                      );
                    })}
                </div>
              </AccordionDetails>
            </Accordion>

            <Input
              name="image"
              register={register}
              placeholder="Image"
              multiple={true}
              type="file"
              error={errors.image}
              responseError={responseErrors.Image}
              onChangeFunction={(e) => {
                const file = e.target.files[0];
                const imageUrl = URL.createObjectURL(file);
                setSelectedImage(imageUrl);
              }}
            />

            {selectedImage && (
              <div className="w-[100px] shrink-0 rounded-[1rem]">
                <img
                  src={selectedImage}
                  className="aspect-[2.3/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
                  alt="Author cover"
                />
              </div>
            )}

            <ResponseErrorMessage message={responseException} />

            <button
              className="mx-auto my-8 flex items-center rounded-[2rem] bg-primaryText px-16 py-6 text-xl text-white active:scale-95 active:shadow-xl"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBlogForm;
