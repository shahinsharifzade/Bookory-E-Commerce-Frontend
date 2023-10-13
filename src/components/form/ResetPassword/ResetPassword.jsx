import LoadingSpinner from "../../ui/Loading/LoadingSpinner";
import { useForm } from "react-hook-form";
import Title from "../../ui/Title/Title";
import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useLocation } from "react-router-dom";
import { useResetPassword } from "../../../service/authService";

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const schema = yup.object().shape({
    password: yup
      .string()
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
      ),
    confirmpassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Passwords do not match"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = useResetPassword();

  const onSubmit = (formData) => {
    mutate({ token, email, formData });
  };

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <>
      <Title
        title={"Reset Password"}
        mainNav={"HOME"}
        secondaryNav={"Reset Password"}
        secondaryNavDisplay={"hidden"}
      />

      <div className="container mb-16 mt-32 max-w-[600px]">
        <h2 className="pb-8 text-center text-[4rem]">Reset Password</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-[20px]"
        >
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />
            <p>{errors.password?.message}</p>

            <input
              {...register("confirmpassword")}
              type="password"
              placeholder="Password Confirm"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />
            <p>{errors.confirmpassword?.message}</p>

            <button
              className="mx-auto my-8 flex items-center rounded-[2rem] bg-primaryText px-16 py-6 text-xl text-white active:scale-95 active:shadow-xl"
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
