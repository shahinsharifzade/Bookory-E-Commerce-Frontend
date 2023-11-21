import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Star } from "lucide-react";
import * as yup from "yup";
import React, { useState } from "react";
import { usePostReview } from "../../../service/reviewService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";

const ReviewForm = ({ bookId }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const schema = yup.object().shape({
    Content: yup.string().required().max(200),
    Rating: yup
      .number()
      .required("Rating is required")
      .min(1, "Rating must be greater than or equal to 1")
      .max(5, "Rating must be less than or equal to 5"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const rating = watch("Rating");

  const { mutate, isLoading } = usePostReview();

  const bookRatingStars = [];

  for (let index = 0; index < 5; index++) {
    if (index < rating) {
      bookRatingStars.push(
        <Star
          className="cursor-pointer"
          key={index}
          color="#f65d4e"
          fill="#f65d4e"
          size={"14px"}
          onClick={() => {
            setValue("Rating", index + 1);
          }}
        />,
      );
    } else {
      bookRatingStars.push(
        <Star
          className="cursor-pointer"
          key={index}
          color="#f65d4e"
          size={"14px"}
          onClick={() => {
            setValue("Rating", index + 1);
          }}
        />,
      );
    }
  }

  const onFormSubmit = (data) => {
    data.EntityType = "book";
    data.EntityId = bookId;
    mutate(data, {
      onSuccess: () => {
        setErrorMessage("");
      },
      onError: (error) => {
        error.response.data.statusCode === 401 &&
          setErrorMessage(error.response.data.message);
      },
    });
  };

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className=" flex items-center">
          Your Rating <span className="mb-6 mr-6 text-primaryText">*</span>
          <div className="flex gap-2">
            {bookRatingStars.map((star, index) => (
              <div key={index}>{star}</div>
            ))}
          </div>
        </div>
        <p className="mb-8 text-xl font-normal text-red-600">
          {!rating && errors.Rating?.message}
        </p>

        <div className="rounded-3xl border border-solid  border-secondaryText p-4 pl-0">
          <textarea
            {...register("Content")}
            id="review"
            placeholder="Your Review *"
            className="h-[200px] w-full overflow-auto border-none border-transparent p-4 font-light outline-none "
          ></textarea>
        </div>
        <p className="text-xl font-normal text-red-600">
          {" "}
          {errors.Content?.message}
        </p>
        <p className="text-xl font-normal text-red-600">{errorMessage}</p>
        <button
          type="submit"
          className="mt-5 rounded-[3rem] border-none bg-primaryText px-12 py-6 text-white active:scale-95 active:shadow-xl"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default ReviewForm;
