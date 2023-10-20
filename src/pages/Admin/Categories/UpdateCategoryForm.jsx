import ResponseErrorMessage from "../../../components/ui/ResponseMessage/ResponseErrorMessage";
import { setResponseErrorMessage } from "../../../utils/setResponseErrorMessages";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../../components/ui/FormInput/Input";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import * as yup from "yup";
import { showToastInfoMessage } from "../../../utils/toastUtils";
import { useUpdateCategory } from "../../../service/categoryService";

const UpdateCategoryForm = ({ category, handleClose }) => {
  const [responseErrors, setResponseErrors] = useState({});
  const [responseException, setResponseException] = useState();

  const { mutate, isLoading } = useUpdateCategory();

  const schema = yup.object().shape({
    name: yup.string().required().max(100),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: category.name,
    },
  });

  const onSubmit = async (formData) => {
    setResponseErrors({});

    formData.id = category.id;

    mutate(formData, {
      onSuccess: () => {
        handleClose();
        showToastInfoMessage("Category successfully updated ");
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
      <div
        className="container z-10 mb-16 mt-32 max-w-[600px] rounded-[3rem] bg-white py-8"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <div>
          <h2 className="pb-8 text-center text-[4rem] text-black">
            Update Category
          </h2>

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
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateCategoryForm;
