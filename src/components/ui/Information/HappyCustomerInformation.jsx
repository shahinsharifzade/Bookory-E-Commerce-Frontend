import React, { useEffect, useState } from "react";
import icons from "../../../assets/icons/index";
import { useGetSearchedBooks } from "../../../service/bookService";

const HappyCustomerInformation = () => {
  const {
    data: booksData,
    isLoading: bookIsLoading,
    isError: booksError,
  } = useGetSearchedBooks();

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
          <p className="mb-4 text-[2.6rem] font-semibold">
            {Math.ceil(happyCustomer)}%
          </p>
          <h5 className="text-lg font-normal text-[#999999]">HAPPY CUSTOMER</h5>
        </div>
      </div>
    </div>
  );
};

export default HappyCustomerInformation;
