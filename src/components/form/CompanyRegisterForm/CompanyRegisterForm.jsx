import LoadingSpinner from "../../ui/Loading/LoadingSpinner";
import { useRegister } from "../../../service/userService";
import Customer from "../../../assets/images/customer.png";
import Vendor from "../../../assets/images/vendor.png";
import { useForm } from "react-hook-form";
import Title from "../../ui/Title/Title";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useCreateCompany } from "../../../service/companyService";
import { useSelector } from "react-redux";
import Input from "../../ui/FormInput/Input";
import { setResponseErrorMessage } from "../../../utils/setResponseErrorMessages";
import ResponseErrorMessage from "../../ui/ResponseMessage/ResponseErrorMessage";

const CompanyRegisterForm = () => {
  const username = useSelector((state) => state.vendorRegistration.username);

  const [responseErrors, setResponseErrors] = useState({});
  const [responseException, setResponseException] = useState();

  const schema = yup.object().shape({
    name: yup.string().required().max(50),
    description: yup.string().required().max(200),
    contactemail: yup.string().required().email(),
    contactphone: yup.string().required(),
    address: yup.string().required().max(200),

    bannerimage: yup.mixed().required("Required"),
    logo: yup.mixed().required("Required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = useCreateCompany();

  const onSubmit = (formData) => {
    formData.username = username;
    mutate(formData, {
      onError: (res) => {
        if (res.response.data.errors) {
          const errorsData = setResponseErrorMessage(res.response.data.errors);
          setResponseErrors(errorsData);
        }
        if (
          res.response.data.statusCode === 400 ||
          res.response.data.statusCode === 404
        ) {
          setResponseException(res.response.data.message);
        }
      },
    });
  };

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <>
      <Title
        title={"Register"}
        mainNav={"HOME"}
        secondaryNav={"Register"}
        secondaryNavDisplay={"hidden"}
      />

      <div className="container mb-16 mt-32 max-w-[600px]">
        <h2 className="pb-8 text-center text-[4rem]">Company Register</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-[20px]"
        >
          <div>
            <Input
              name="name"
              register={register}
              placeholder="name"
              type="text"
              error={errors.name}
              responseError={responseErrors.Name}
            />

            <Input
              name="description"
              register={register}
              placeholder="description"
              type="text"
              error={errors.description}
              responseError={responseErrors.Description}
            />

            <Input
              name="contactemail"
              register={register}
              placeholder="contact email"
              type="text"
              error={errors.contactemail}
              responseError={responseErrors.ContactEmail}
            />

            <Input
              name="contactphone"
              register={register}
              placeholder="contact phone"
              type="text"
              error={errors.contactphone}
              responseError={responseErrors.ContactPhone}
            />

            <Input
              name="address"
              register={register}
              placeholder="address"
              type="text"
              error={errors.address}
              responseError={responseErrors.Address}
            />

            <Input
              name="bannerimage"
              register={register}
              placeholder="banner image"
              type="file"
              error={errors.bannerimage}
              responseError={responseErrors.BannerImage}
            />

            <Input
              name="logo"
              register={register}
              placeholder="logo"
              type="file"
              error={errors.logo}
              responseError={responseErrors.Logo}
            />
            <ResponseErrorMessage message={responseException} />

            <button
              className="mx-auto my-8 flex items-center rounded-[2rem] bg-primaryText px-16 py-6 text-xl text-white active:scale-95 active:shadow-xl"
              type="submit"
            >
              Create Company
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CompanyRegisterForm;
