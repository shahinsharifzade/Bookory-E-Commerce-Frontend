import LoadingSpinner from "../../ui/Loading/LoadingSpinner";
import { useLogin } from "../../../service/authService";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../ui/Title/Title";
import { setResponseErrorMessage } from "../../../utils/setResponseErrorMessages";
import ResponseErrorMessage from "../../ui/ResponseMessage/ResponseErrorMessage";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [responseErrors, setResponseErrors] = useState({});
  const [responseException, setResponseException] = useState();

  const { mutate, isLoading, isSuccess } = useLogin();
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm();

  const onSubmit = (formData) => {
    setLoading(true);
    setResponseErrors({});
    setResponseException("");

    mutate(formData, {
      onError: (res) => {
        if (res.response.data.errors) {
          console.log("ah");
          const errorsData = setResponseErrorMessage(res.response.data.errors);
          setResponseErrors(errorsData);
        } else if (res.response.data.status === 400) {
          console.log("uh");
          setResponseException(res.response.data.message);
        }
      },
    });
  };

  useEffect(() => {
    if (loading && isSuccess) {
      setTimeout(() => {
        setLoading(false);
        navigate("/");
        window.location.reload();
      }, 2000);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading, isSuccess]);

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
            <ResponseErrorMessage message={responseErrors.UserName} />

            <input
              {...register("password")}
              type="password"
              placeholder="password"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />
            <ResponseErrorMessage message={responseErrors.Password} />
            <ResponseErrorMessage message={responseException} />

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
