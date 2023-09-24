import React, { useEffect, useState } from "react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import icons from "../../../assets/icons/index";

const fetchAuthor = async () => {
  const response = await axios
    .get(`https://localhost:7047/api/Authors`)
    .catch((error) => {
      return <div>{error.response.data.message}</div>;
    });

  return response.data;
};

const AuthorsInformation = () => {
  const {
    data: authorsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["authors"],
    queryFn: fetchAuthor,
  });

  const [numbersOfAuthors, setNumberOfAuthors] = useState(0);

  useEffect(() => {
    if (authorsData) {
      setNumberOfAuthors(authorsData.length);
    }
  }, [authorsData]);

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

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
