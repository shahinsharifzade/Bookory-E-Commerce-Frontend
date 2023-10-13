import LoadingSpinner from "../../ui/Loading/LoadingSpinner";
import { useRegister } from "../../../service/userService";
import Customer from "../../../assets/images/customer.png";
import Vendor from "../../../assets/images/vendor.png";
import { useForm } from "react-hook-form";
import Title from "../../ui/Title/Title";
import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useCreateCompany } from "../../../service/companyService";
import { useSelector } from "react-redux";

const CompanyRegisterForm = () => {
  const username = useSelector((state) => state.vendorRegistration.username);

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
    mutate(formData);
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
            <input
              {...register("name")}
              type="text"
              placeholder="name"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />
            <p>{errors.name?.message}</p>

            <input
              {...register("description")}
              type="text"
              placeholder="description"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />
            <p>{errors.description?.message}</p>

            <input
              {...register("contactemail")}
              type="text"
              placeholder="contactemail"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />
            <p>{errors.contactemail?.message}</p>

            <input
              {...register("contactphone")}
              type="tel"
              placeholder="contactphone"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />
            <p>{errors.contactphone?.message}</p>

            <input
              {...register("address")}
              type="text"
              placeholder="address"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />
            <p>{errors.address?.message}</p>

            <input
              {...register("bannerimage")}
              type="file"
              accept="image/*"
              placeholder="Banner Image"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />
            <p>{errors.bannerimage?.message}</p>

            <input
              {...register("logo")}
              type="file"
              accept="image/*"
              placeholder="Logo Image"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />
            <p>{errors.logo?.message}</p>

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
