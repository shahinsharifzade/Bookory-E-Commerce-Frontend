import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingSpinner from "../../ui/Loading/LoadingSpinner";
import { useForm } from "react-hook-form";
import ResponseErrorMessage from "../../ui/ResponseMessage/ResponseErrorMessage";
import { setResponseErrorMessage } from "../../../utils/setResponseErrorMessages";
import Input from "../../ui/FormInput/Input";
import {
  useDeleteAddress,
  useUpdateAddress,
} from "../../../service/addressService";
import { Trash2 } from "lucide-react";

const AddressUpdateForm = ({ handleClose, address }) => {
  const [responseErrors, setResponseErrors] = useState({});
  const [responseException, setResponseException] = useState();

  const schema = yup.object().shape({
    addressline1: yup.string().required().max(100),
    addressline2: yup.string().required().max(100),
    country: yup.string().required(),
    city: yup.string().required(),
    telephone: yup.string().required(),
    mobile: yup.string().required(),
    postalCode: yup.string().required(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      addressline1: address.addressLine1,
      addressline2: address.addressLine2,
      country: address.country,
      city: address.city,
      telephone: address.telephone,
      mobile: address.mobile,
      postalCode: address.postalCode,
    },
  });

  const { mutate, isLoading } = useUpdateAddress();
  const { mutate: deleteMutate, isLoading: deleteIsLoading } =
    useDeleteAddress();

  const onSubmit = (formData) => {
    setResponseErrors({});
    formData.id = address.id;

    console.log(
      "🚀 ~ file: AddressUpdateForm.jsx:36 ~ onSubmit ~ formData:",
      formData,
    );

    mutate(formData, {
      onSuccess: () => {
        handleClose();
      },
      onError: (res) => {
        if (res.response.data.errors) {
          const errorsData = setResponseErrorMessage(res.response.data.errors);
          setResponseErrors(errorsData);
        }
        if (
          res.response.data.statusCode === 400 ||
          res.response.data.statusCode === 409
        ) {
          setResponseException(res.response.data.message);
        }
      },
    });
  };

  const handleDelete = () => {
    deleteMutate(address.id);
    handleClose();
  };

  if (isLoading || deleteIsLoading)
    return <LoadingSpinner isLoading={isLoading || deleteIsLoading} />;

  return (
    <>
      <div className="container z-10 mb-16 mt-32 max-w-[600px] rounded-[3rem] bg-white py-8">
        <h2 className="pb-8 text-center text-[4rem] text-black">
          Update Shipping Address
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-[20px]"
        >
          <div className="flex flex-col">
            <Input
              register={register}
              name="addressline1"
              placeholder="Address Line 1"
              type="text"
              error={errors.addressline1}
              responseError={responseErrors.addressLine1}
            />

            <Input
              register={register}
              name="addressline2"
              placeholder="Address Line 2"
              type="text"
              error={errors.addressline2}
              responseError={responseErrors.addressLine2}
            />

            <Input
              register={register}
              name="country"
              placeholder="Country"
              type="text"
              error={errors.country}
              responseError={responseErrors.Country}
            />

            <Input
              register={register}
              name="city"
              placeholder="City"
              type="text"
              error={errors.city}
              responseError={responseErrors.City}
            />

            <Input
              register={register}
              name="telephone"
              placeholder="Telephone"
              type="text"
              error={errors.telephone}
              responseError={responseErrors.Telephone}
            />

            <Input
              register={register}
              name="mobile"
              placeholder="Mobile"
              type="text"
              initalValue={address.mobile}
              error={errors.mobile}
              responseError={responseErrors.Mobile}
            />

            <Input
              register={register}
              name="postalCode"
              placeholder="Postal Code"
              type="text"
              error={errors.postalCode}
              responseError={responseErrors.PostalCode}
            />

            <ResponseErrorMessage message={responseException} />

            <button
              className="mx-auto my-8 flex items-center rounded-[2rem] bg-primaryText px-16 py-6 text-xl text-white active:scale-95 active:shadow-xl"
              type="submit"
            >
              Update Address
            </button>

            <div
              className="mr-4 flex cursor-pointer items-center gap-8 self-end"
              onClick={() => handleDelete()}
            >
              <p className="text-[18px] font-semibold">Delete Address </p>
              <Trash2 size={20} color="#f65d4e" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddressUpdateForm;
