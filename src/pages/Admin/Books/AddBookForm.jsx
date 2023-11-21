import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { setResponseErrorMessage } from "../../../utils/setResponseErrorMessages";
import Input from "../../../components/ui/FormInput/Input";
import React, { useState } from "react";
import * as yup from "yup";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import ResponseErrorMessage from "../../../components/ui/ResponseMessage/ResponseErrorMessage";
import { useAddBook } from "../../../service/bookService";
import { useGetAllAuthors } from "../../../service/authorService";
import { useGetAllGenres } from "../../../service/genreService";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ArrowBigDown } from "lucide-react";

const AddBookForm = ({ handleClose }) => {
  const [responseErrors, setResponseErrors] = useState({});
  const [responseException, setResponseException] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const schema = yup.object().shape({
    title: yup.string().required().max(100),
    description: yup.string().required().max(300),
    price: yup.string().required(),
    discountpercentage: yup.string().max(100),
    stockquantity: yup.string().required(),
    authorid: yup.string().required(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading: loadingMutate } = useAddBook();
  const { data: authors, isLoading: loadingAuthors } = useGetAllAuthors();

  const { data: genres, isLoading: loadingGenres } = useGetAllGenres();

  const onSubmit = (formData) => {
    console.log(
      "🚀 ~ file: AddBookForm.jsx:35 ~ onSubmit ~ formData:",
      formData,
    );
    setResponseErrors({});
    formData.mainimageindex = 0;

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
  if (loadingMutate || loadingAuthors || loadingGenres)
    return (
      <LoadingSpinner
        isLoading={loadingMutate || loadingAuthors || loadingGenres}
      />
    );
  console.log(
    "🚀 ~ file: AddBookForm.jsx:36 ~ AddBookForm ~ authors:",
    authors,
  );

  return (
    <>
      <div
        className="container z-10 mb-16 mt-32 max-w-[600px] rounded-[3rem] bg-white py-8 scrollbar-none"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <h2 className="pb-8 text-center text-[4rem] text-black">Add Book</h2>

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
              name="description"
              register={register}
              placeholder="Description"
              type="text"
              error={errors.description}
              responseError={responseErrors.Description}
            />

            <Input
              name="price"
              register={register}
              placeholder="Price"
              type="number"
              error={errors.price}
              responseError={responseErrors.Price}
            />

            <Input
              name="discountpercentage"
              register={register}
              placeholder="Discount Percentage"
              type="number"
              error={errors.discountpercentage}
              responseError={responseErrors.Discountpercentage}
            />

            <Input
              name="stockquantity"
              register={register}
              placeholder="Stock Quantity"
              type="number"
              error={errors.stockquantity}
              responseError={responseErrors.Stockquantity}
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
                <h2 className="ml-4 text-secondartTextBold">Authors</h2>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-wrap items-center justify-center gap-8">
                  {authors.map((author) => {
                    return (
                      <div className="flex">
                        <label htmlFor={author.id}>
                          <Input
                            id={author.id}
                            name="authorid"
                            register={register}
                            placeholder="Author"
                            type="radio"
                            error={errors.authorid}
                            responseError={responseErrors.Authorid}
                            inputValue={author.id}
                          />
                          <p className="text-lg font-medium">{author.name}</p>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </AccordionDetails>
            </Accordion>

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
                <h2 className="ml-4 text-secondartTextBold">Genres</h2>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-wrap items-center justify-center gap-8">
                  {genres.map((genre) => {
                    return (
                      <div className="flex">
                        <label htmlFor={genre.id}>
                          <Input
                            name="genreids"
                            register={register}
                            placeholder="Genres"
                            type="checkbox"
                            error={errors.genreids}
                            responseError={responseErrors.Genreids}
                            inputValue={genre.id}
                            id={genre.id}
                          />
                          <p className="text-lg font-medium">{genre.name}</p>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </AccordionDetails>
            </Accordion>

            <Input
              name="images"
              register={register}
              placeholder="Images"
              multiple={true}
              type="file"
              error={errors.images}
              responseError={responseErrors.Images}
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

export default AddBookForm;
