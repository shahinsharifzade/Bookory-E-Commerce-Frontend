import React, { useEffect, useState } from "react";
import icons from "../../../assets/icons/index";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useGetSearchedBooks } from "../../../service/bookService";

const BooksInformation = () => {
  const {
    data: booksData,
    isLoading: bookIsLoading,
    isError: booksError,
  } = useGetSearchedBooks();

  const [soldQuantity, setSoldQuantity] = useState(0);
  const [booksQuantity, setBooksQuantity] = useState(0);

  useEffect(() => {
    if (booksData) {
      let totalQuantity = 0;
      booksData.forEach((book) => {
        totalQuantity += book.soldQuantity;
      });
      setSoldQuantity(totalQuantity);
      setBooksQuantity(booksData.length);
    }
  }, [booksData]);

  if (bookIsLoading) {
    return <LoadingSpinner isLoading={bookIsLoading} />;
  }

  if (booksError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="flex w-full">
      <div className="mx-6 flex w-1/2 rounded-3xl border-[1px] border-solid border-secondaryText px-12 py-16">
        <div className="mr-12 rounded-full bg-[#edebfc] p-5">
          <img src={icons.Book} className="h-16 w-16" alt="Book icon" />
        </div>
        <div>
          <p className="mb-4 text-[2.6rem] font-semibold">{booksQuantity}</p>
          <h5 className="text-lg font-normal text-[#999999]">TOTAL BOOKS</h5>
        </div>
      </div>

      <div className="mx-6 flex w-1/2 rounded-3xl border-[1px] border-solid border-secondaryText px-12 py-16">
        <div className="mr-12 rounded-full bg-[#edebfc] p-5">
          <img src={icons.Basket} className="h-16 w-16" alt="Basket icon" />
        </div>
        <div>
          <p className="mb-4 text-[2.6rem] font-semibold">{soldQuantity}</p>
          <h5 className="text-lg font-normal text-[#999999]">BOOKS SOLD</h5>
        </div>
      </div>
    </div>
  );
};

export default BooksInformation;
