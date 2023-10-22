import React, { useState } from "react";
import Title from "../../../components/ui/Title/Title";
import { useLocation } from "react-router-dom";
import { useVerifyAccount } from "../../../service/authService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import SuccessMessage from "../../../components/ui/SuccessPage/SuccessMessage";

const EmailConfirmation = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const loaction = useLocation();
  const searchParams = new URLSearchParams(loaction.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const { mutate, isLoading } = useVerifyAccount();

  const handleSubmit = () => {
    mutate(
      { token, email },
      {
        onSuccess: () => {
          setShowSuccessModal(true);
        },
      },
    );
  };
  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <section>
      <Title
        title={"Bookory"}
        mainNavDisplay={"hidden"}
        secondaryNavDisplay={"hidden"}
      />

      <div className="container mb-16 mt-24 flex max-w-[60rem] flex-col text-center ">
        <div>
          <p className="text-[3.2rem] font-semibold ">
            Confirm your email address
          </p>
          <p className="my-6 text-secondartTextBold">
            Please click the button below to confirm your email address:
          </p>
        </div>

        <button
          className="mx-auto my-8 flex items-center rounded-[2rem] bg-primaryText px-16 py-6 text-xl text-white active:scale-95 active:shadow-xl"
          type="submit"
          onClick={handleSubmit}
        >
          Confirm Email
        </button>

        <div>
          <p className="my-6 font-normal text-secondartTextBold">
            Once confirmed, this email will be uniquely associated with your
            Bookory account
          </p>

          <p className="font-semibold text-primaryText">
            Cheers <br />
            The Bookory Team
          </p>
        </div>
      </div>

      {showSuccessModal && (
        <SuccessMessage
          message={
            "Success! 🎉 Your email has been confirmed, and you're now officially part of the Bookory family. Welcome to a world of books, where your reading adventures await. Feel free to dive into our collections and make the most of your literary journey! "
          }
          navigation="/login"
          navigationTitle="Login"
        />
      )}
    </section>
  );
};

export default EmailConfirmation;
