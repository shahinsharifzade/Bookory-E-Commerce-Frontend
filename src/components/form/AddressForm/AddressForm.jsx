import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingSpinner from "../../ui/Loading/LoadingSpinner";
import { useForm } from "react-hook-form";
import ResponseErrorMessage from "../../ui/ResponseMessage/ResponseErrorMessage";
import { setResponseErrorMessage } from "../../../utils/setResponseErrorMessages";
import Input from "../../ui/FormInput/Input";
import { useAddAddress } from "../../../service/addressService";

const AddressForm = () => {
  const [responseErrors, setResponseErrors] = useState({});
  const [responseException, setResponseException] = useState();

  const schema = yup.object().shape({
    addressline1: yup.string().required().max(100),
    addressline2: yup.string().required().max(100),
    country: yup.string().required(),
    city: yup.string().required(),
    telephone: yup.string().required(),
    mobile: yup.string().required(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = useAddAddress();

  const onSubmit = (formData) => {
    setResponseErrors({});

    mutate(formData, {
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

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <>
      <div className="container z-10 mb-16 mt-32 max-w-[600px] rounded-[3rem] bg-white py-8">
        <h2 className="pb-8 text-center text-[4rem] text-black">
          Add Shipping Address
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-[20px]"
        >
          <div>
            <Input
              name="addressline1"
              register={register}
              placeholder="Address Line 1"
              type="text"
              error={errors.addressline1}
              responseError={responseErrors.addressLine1}
            />

            <Input
              name="addressline2"
              register={register}
              placeholder="Address Line 2"
              type="text"
              error={errors.addressline2}
              responseError={responseErrors.addressLine2}
            />

            <Input
              name="country"
              register={register}
              placeholder="Country"
              type="text"
              error={errors.country}
              responseError={responseErrors.Country}
            />

            <Input
              name="city"
              register={register}
              placeholder="City"
              type="text"
              error={errors.city}
              responseError={responseErrors.City}
            />

            <Input
              name="telephone"
              register={register}
              placeholder="Telephone"
              type="text"
              error={errors.telephone}
              responseError={responseErrors.Telephone}
            />

            <Input
              name="mobile"
              register={register}
              placeholder="Mobile"
              type="text"
              error={errors.mobile}
              responseError={responseErrors.Mobile}
            />

            <Input
              name="postalcode"
              register={register}
              placeholder="Postal Code"
              type="text"
              error={errors.postalcode}
              responseError={responseErrors.PostalCode}
            />

            <ResponseErrorMessage message={responseException} />

            <button
              className="mx-auto my-8 flex items-center rounded-[2rem] bg-primaryText px-16 py-6 text-xl text-white active:scale-95 active:shadow-xl"
              type="submit"
            >
              Add Address
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddressForm;
