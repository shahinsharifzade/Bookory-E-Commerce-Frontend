import LoadingSpinner from "../../ui/Loading/LoadingSpinner";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import Vendor from "../../../assets/images/vendor.png";
import Customer from "../../../assets/images/customer.png";
import Title from "../../ui/Title/Title";

const RegisterForm = () => {
  const { handleSubmit, register, watch, setValue } = useForm();
  const vendor = watch("isVendor");

  useEffect(() => {
    setValue("isVendor", false);
  }, []);

  const onSubmit = (formData) => {
    console.log(
      "🚀 ~ file: RegisterForm.jsx:12 ~ onSubmit ~ formData:",
      formData,
    );
  };

  //   if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <>
      <Title
        title={"Register"}
        mainNav={"HOME"}
        secondaryNav={"Register"}
        secondaryNavDisplay={"hidden"}
      />

      <div className="container mb-16 mt-32 max-w-[600px]">
        <h2 className="pb-8 text-center text-[4rem]">Register</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-[20px]"
        >
          <div>
            <div className="my-4 flex items-center justify-center gap-10">
              <div
                className={`rounded-3xl border-[3px] border-solid active:scale-95 ${
                  vendor === false
                    ? "border-primaryText"
                    : "border-secondaryText"
                }`}
                onClick={() => setValue("isVendor", false)}
              >
                <div className="m-4 w-[6rem]">
                  <img
                    src={Customer}
                    alt="customer"
                    className="aspect-[2.4/3] h-full w-full cursor-pointer rounded-[2rem] object-contain"
                  />
                </div>
              </div>
              {console.log(vendor)}
              <div
                className={`rounded-3xl border-[3px] border-solid active:scale-95 ${
                  vendor == true ? "border-primaryText" : "border-secondaryText"
                }`}
                onClick={() => setValue("isVendor", true)}
              >
                <div className="m-4 w-[6rem]">
                  <img
                    src={Vendor}
                    alt="vendor"
                    className="aspect-[2.4/3] h-full w-full cursor-pointer rounded-[2rem] object-cover"
                  />
                </div>
              </div>
            </div>

            <input
              {...register("username")}
              type="text"
              placeholder="username"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />

            <input
              {...register("fullname")}
              type="text"
              placeholder="fullname"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />

            <input
              {...register("email")}
              type="text"
              placeholder="email"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />

            <input
              {...register("password")}
              type="password"
              placeholder="password"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />

            <input
              {...register("confirmpassword")}
              type="password"
              placeholder="confirmpassword"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />

            <button
              className="mx-auto my-8 flex items-center rounded-[2rem] bg-primaryText px-16 py-6 text-xl text-white active:scale-95 active:shadow-xl"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
