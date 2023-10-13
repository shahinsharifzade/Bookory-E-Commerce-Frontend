import LoadingSpinner from "../../ui/Loading/LoadingSpinner";
import { useLogin } from "../../../service/authService";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../ui/Title/Title";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { mutate, isLoading, isSuccess } = useLogin();
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm();

  const onSubmit = (formData) => {
    setLoading(true);
    mutate(formData, {
      onSuccess: () => {},
    });
  };

  useEffect(() => {
    if (loading && isSuccess) {
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 2000);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  if (isLoading || loading)
    return <LoadingSpinner isLoading={isLoading || loading} />;

  return (
    <>
      <Title
        title={"Login"}
        mainNav={"HOME"}
        secondaryNav={"Login"}
        secondaryNavDisplay={"hidden"}
      />
      <div className="container mb-16 mt-32 max-w-[600px]">
        <h2 className="text-center text-[4rem]">Login</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-[20px]"
        >
          <div>
            <input
              {...register("username")}
              type="text"
              placeholder="username"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />

            <input
              {...register("password")}
              type="password"
              placeholder="password"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />

            <button
              className="mx-auto my-8 flex items-center rounded-[2rem] bg-primaryText px-16 py-6 text-xl text-white active:scale-95 active:shadow-xl"
              type="submit"
            >
              Sign In
            </button>

            <div className="flex justify-between font-medium ">
              <div className="cursor-pointer">
                <Link to={"/forgotpassword"} className="underline">
                  Forgot Your Password?
                </Link>
              </div>

              <div className="cursor-pointer">
                <Link to={"/register"} className="underline">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
