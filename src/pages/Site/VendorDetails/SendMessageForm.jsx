import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { usePostmessage } from "../../../service/companyService";

const SendMessageForm = ({ storeId }) => {
  const schema = yup.object().shape({
    Name: yup.string().required().max(30).trim(),
    Email: yup.string().required().email(),
    Message: yup.string().required().max(300),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { mutate } = usePostmessage();

  const onFormSubmit = (data) => {
    data.CompanyId = storeId;
    mutate(data);
  };

  return (
    <div>
      <div>
        <h2 className="mb-8 text-[2rem] font-semibold">Contact Vendor</h2>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <input
            {...register("Name")}
            type="text"
            placeholder="Your Name"
            className="mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
          />
          <p className="text-red-600">{errors.Name?.message}</p>

          <input
            {...register("Email")}
            type="text"
            placeholder="you@example.com"
            className="mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-6 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
          />
          <p className="text-red-600">{errors.Email?.message}</p>

          <textarea
            {...register("Message")}
            rows={6}
            placeholder="Type your message"
            className="mb-4 w-full rounded-[3rem] border-2 border-solid border-secondaryText px-8 py-10 text-xl font-normal transition-all duration-200 ease-out focus:border-secondartTextBold focus:outline-none"
          />
          <p className="text-red-600">{errors.Message?.message}</p>

          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-[4rem] bg-primaryText px-12 py-6 text-xl text-white active:scale-95 active:shadow-xl"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMessageForm;
