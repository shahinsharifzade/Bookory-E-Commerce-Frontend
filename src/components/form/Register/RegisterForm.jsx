import LoadingSpinner from "../../ui/Loading/LoadingSpinner";
import { useRegister } from "../../../service/userService";
import Customer from "../../../assets/images/customer.png";
import Vendor from "../../../assets/images/vendor.png";
import { useForm } from "react-hook-form";
import Title from "../../ui/Title/Title";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUsername } from "../../../features/register/vendorRegisterSlice";
import ResponseErrorMessage from "../../ui/ResponseMessage/ResponseErrorMessage";
import { setResponseErrorMessage } from "../../../utils/setResponseErrorMessages";
import Input from "../../ui/FormInput/Input";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [responseErrors, setResponseErrors] = useState({});
  const [responseException, setResponseException] = useState();

  const schema = yup.object().shape({
    username: yup.string().required().max(50),
    fullname: yup.string().required(),
    email: yup.string().required().email(),
    password: yup
      .string()
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
      ),
    passwordconfirm: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Passwords do not match"),
  });

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const vendor = watch("RegisterAsVendor");

  useEffect(() => {
    setValue("RegisterAsVendor", false);
  }, []);

  const { mutate, isLoading } = useRegister();

  const onSubmit = (formData) => {
    setResponseErrors({});

    mutate(formData, {
      onSuccess: () => {
        if (vendor) {
          dispatch(setUsername(formData.username));
          navigate("companyregister");
        }
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
                onClick={() => setValue("RegisterAsVendor", false)}
              >
                <div className="m-4 w-[6rem]">
                  <img
                    src={Customer}
                    alt="customer"
                    className="aspect-[2.4/3] h-full w-full cursor-pointer rounded-[2rem] object-contain"
                  />
                </div>
              </div>
              <div
                className={`rounded-3xl border-[3px] border-solid active:scale-95 ${
                  vendor == true ? "border-primaryText" : "border-secondaryText"
                }`}
                onClick={() => setValue("RegisterAsVendor", true)}
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

            <Input
              name="username"
              register={register}
              placeholder="username"
              type="text"
              error={errors.username}
              responseError={responseErrors.UserName}
            />

            <Input
              name="fullname"
              register={register}
              placeholder="fullname"
              type="text"
              error={errors.fullname}
              responseError={responseErrors.FullName}
            />

            <Input
              name="email"
              register={register}
              placeholder="email"
              type="text"
              error={errors.email}
              responseError={responseErrors.Email}
            />

            <Input
              name="password"
              register={register}
              placeholder="password"
              type="password"
              error={errors.password}
              responseError={responseErrors.Password}
            />

            <Input
              name="passwordconfirm"
              register={register}
              placeholder="passwordconfirm"
              type="password"
              error={errors.passwordconfirm}
              responseError={responseErrors.PasswordConfirm}
            />

            <ResponseErrorMessage message={responseException} />

            <button
              className="mx-auto my-8 flex items-center rounded-[2rem] bg-primaryText px-16 py-6 text-xl text-white active:scale-95 active:shadow-xl"
              type="submit"
            >
              Sign Up
            </button>
            <div className="font-normal">
              Already have an account ?{" "}
              <Link to={"/login"} className=" text-primaryText underline ">
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
