import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { setResponseErrorMessage } from "../../../utils/setResponseErrorMessages";
import Input from "../../../components/ui/FormInput/Input";
import React, { useState } from "react";
import * as yup from "yup";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import ResponseErrorMessage from "../../../components/ui/ResponseMessage/ResponseErrorMessage";
import { useAddCategory } from "../../../service/categoryService";

const AddCategoryForm = ({ handleClose }) => {
  const [responseErrors, setResponseErrors] = useState({});
  const [responseException, setResponseException] = useState();

  const schema = yup.object().shape({
    name: yup.string().required().max(100),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = useAddCategory();

  const onSubmit = (formData) => {
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
  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <>
      <div className="container z-10 mb-16 mt-32 max-w-[600px] rounded-[3rem] bg-white py-8">
        <h2 className="pb-8 text-center text-[4rem] text-black">Add Genre</h2>

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

export default AddCategoryForm;
