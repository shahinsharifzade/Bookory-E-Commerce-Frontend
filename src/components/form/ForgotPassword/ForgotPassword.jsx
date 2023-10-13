import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Title from "../../ui/Title/Title";
import * as yup from "yup";
import React from "react";
import { useForgotPassword } from "../../../service/authService";
import LoadingSpinner from "../../ui/Loading/LoadingSpinner";

const ForgotPassword = () => {
  const schema = yup.object().shape({
    email: yup.string().required().email(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = useForgotPassword();

  const onSubmit = (formData) => {
    console.log(formData);
    mutate(formData);
  };

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <>
      <div className={`bg-[#f0f0f0] py-20 `}>
        <div className="container flex items-center justify-between">
          <h3
            className={`text-[5rem] font-semibold capitalize minw-sm:text-[6.4rem] `}
          >
            Reset Password
          </h3>
        </div>
      </div>

      <div className="container mb-16 mt-32 max-w-[600px]">
        <h2 className="text-center text-[3.5rem]">Forgot your Password ?</h2>

        <div className="py-10 font-normal text-secondartTextBold">
          Enter the email address you used when you joined and we'lll sen you
          instructions to reset your password
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-[20px]"
        >
          <div>
            <input
              {...register("email")}
              type="text"
              placeholder="email"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />

            <p className="py-2 text-xl capitalize text-primaryText">
              {errors.email?.message}
            </p>

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

export default ForgotPassword;
