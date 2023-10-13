import LoadingSpinner from "../../ui/Loading/LoadingSpinner";
import { useRegister } from "../../../service/userService";
import Customer from "../../../assets/images/customer.png";
import Vendor from "../../../assets/images/vendor.png";
import { useForm } from "react-hook-form";
import Title from "../../ui/Title/Title";
import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, unstable_HistoryRouter, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUsername } from "../../../features/register/vendorRegisterSlice";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    mutate(formData, {
      onSuccess: () => {
        if (vendor) {
          console.log(vendor);

          dispatch(setUsername(formData.username));
          navigate("companyregister");
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

            <input
              {...register("username")}
              type="text"
              placeholder="username"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />
            <p>{errors.username?.message}</p>

            <input
              {...register("fullname")}
              type="text"
              placeholder="fullname"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />
            <p>{errors.fullname?.message}</p>

            <input
              {...register("email")}
              type="text"
              placeholder="email"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />
            <p>{errors.email?.message}</p>

            <input
              {...register("password")}
              type="password"
              placeholder="password"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />
            <p>{errors.password?.message}</p>

            <input
              {...register("passwordconfirm")}
              type="password"
              placeholder="passwordconfirm"
              className="my-4 mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
            />
            <p>{errors.passwordconfirm?.message}</p>

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
