import React, { useEffect, useState } from "react";
import icons from "../../../assets/icons/index";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBooks = async () => {
  const response = await axios
    .get(`https://localhost:7047/api/books`)
    .catch((error) => {
      console.log(error.response.data.message);
      return <div>{error.response.data.message}</div>;
    });
  return response.data;
};

const HappyCustomerInformation = () => {
  const {
    data: booksData,
    isLoading: bookIsLoading,
    isError: booksError,
  } = useQuery({ queryKey: ["books"], queryFn: fetchBooks });

  const [happyCustomer, setHappyCutomer] = useState(0);
  useEffect(() => {
    if (booksData) {
      const totalBooks = booksData.length;
      const happyBooks = booksData.filter(
        (book) => book.rating === 4 || book.rating === 5,
      ).length;
      const happyCustomerPercentage = (happyBooks / totalBooks) * 100;

      setHappyCutomer(happyCustomerPercentage);
    }
  }, [booksData]);

  return (
    <div className="flex w-full">
      <div className="mx-6 flex w-full rounded-3xl border-[1px] border-solid border-secondaryText px-12 py-16">
        <div className="mr-12 rounded-full bg-[#edebfc] p-5">
          <img src={icons.HappyEmoji} className="h-16 w-16" alt="Book icon" />
        </div>
        <div>
          <p className="mb-4 text-[2.6rem] font-semibold">{happyCustomer}%</p>
          <h5 className="text-lg font-normal text-[#999999]">HAPPY CUSTOMER</h5>
        </div>
      </div>
    </div>
  );
};

export default HappyCustomerInformation;
