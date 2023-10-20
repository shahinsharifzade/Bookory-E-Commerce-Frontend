import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { setResponseErrorMessage } from "../../../utils/setResponseErrorMessages";
import Input from "../../../components/ui/FormInput/Input";
import { useAddAuthor } from "../../../service/authorService";
import React, { useState } from "react";
import * as yup from "yup";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import ResponseErrorMessage from "../../../components/ui/ResponseMessage/ResponseErrorMessage";

const AddAuthorForm = ({ handleClose }) => {
  const [responseErrors, setResponseErrors] = useState({});
  const [responseException, setResponseException] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const schema = yup.object().shape({
    name: yup.string().required().max(100),
    biography: yup.string().required().max(1000),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = useAddAuthor();

  const onSubmit = (formData) => {
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
  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <>
      <div className="container z-10 mb-16 mt-32 max-w-[600px] rounded-[3rem] bg-white py-8">
        <h2 className="pb-8 text-center text-[4rem] text-black">Add Author</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-[20px]"
        >
          <div>
            <Input
              name="name"
              register={register}
              placeholder="Name"
              type="text"
              error={errors.name}
              responseError={responseErrors.name}
            />

            <Input
              name="biography"
              register={register}
              placeholder="Biography"
              type="text"
              error={errors.biography}
              responseError={responseErrors.biography}
            />

            <Input
              name="images"
              register={register}
              placeholder="Images"
              multiple={true}
              type="file"
              error={errors.images}
              responseError={responseErrors.images}
              onChangeFunction={(e) => {
                const file = e.target.files[0];
                const imageUrl = URL.createObjectURL(file);
                setSelectedImage(imageUrl);
              }}
            />

            <div className="w-[100px] shrink-0 rounded-[1rem]">
              <img
                src={selectedImage}
                className="aspect-[2.3/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
                alt="Author cover"
              />
            </div>

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

export default AddAuthorForm;
