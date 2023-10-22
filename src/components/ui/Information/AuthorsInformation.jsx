import React, { useEffect, useState } from "react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import icons from "../../../assets/icons/index";
import { useGetAllAuthors } from "../../../service/authorService";
import { useNavigate } from "react-router-dom";

const AuthorsInformation = () => {
  const navigate = useNavigate();
  const { data: authorsData, isLoading, isError, error } = useGetAllAuthors();

  const [numbersOfAuthors, setNumberOfAuthors] = useState(0);

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  useEffect(() => {
    if (authorsData) {
      setNumberOfAuthors(authorsData.length);
    }
  }, [authorsData]);

  if (isError) return <div>Error fetching data</div>;
  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <div className="flex w-full">
      <div className="mx-6 flex w-full rounded-3xl border-[1px] border-solid border-secondaryText px-12 py-16">
        <div className="mr-12 rounded-full bg-[#edebfc] p-5">
          <img src={icons.Person} className="h-16 w-16" alt="Book icon" />
        </div>
        <div>
          <p className="mb-4 text-[2.6rem] font-semibold">{numbersOfAuthors}</p>
          <h5 className="text-lg font-normal text-[#999999]">AUTHORS</h5>
        </div>
      </div>
    </div>
  );
};

export default AuthorsInformation;
