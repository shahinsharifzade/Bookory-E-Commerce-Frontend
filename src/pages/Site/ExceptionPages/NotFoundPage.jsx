import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/");
  };

  return (
    <section className="container">
      <div
        className="mx-auto mb-48 mt-24 flex h-[50rem] w-[60rem]"
        style={{
          backgroundImage: `url("https://demo2.pavothemes.com/bookory/wp-content/themes/bookory/assets/images/404/404.png")`,
        }}
      >
        <div className="text-center">
          <h1 className="mx-auto  w-min text-center text-[16rem] font-bold text-primaryText">
            404
          </h1>
          <p className="text-[4.8rem] tracking-[-2px]">
            OOPS! THAT PAGE CAN'T BE FOUND.
          </p>
          <p className="text-[1.8rem] font-light text-secondartTextBold">
            It looks like nothing was found at this location. You can either go
            back to the last page or go to homepage.
          </p>

          <button
            className="mx-auto my-8 flex items-center rounded-[3rem] bg-primaryText px-16 py-6 text-xl text-white active:scale-95 active:shadow-xl"
            onClick={onSubmit}
          >
            Homepage
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
