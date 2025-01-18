import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import InfoDisplay from "../../../components/ui/InfoDisplay/InfoDisplay";
import { ArrowBigDown } from "lucide-react";
import {
  useApproveBook,
  useGetBookById,
  useRejectBook,
} from "../../../service/bookService";

const BookDetailsView = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const { data: book, isError, isLoading, error } = useGetBookById(bookId);
  console.log(
    "🚀 ~ file: BookDetailsView.jsx:18 ~ BookDetailsView ~ book:",
    book,
  );
  const { mutate: approveMutate, isLoading: loadingApprove } = useApproveBook();
  const { mutate: rejectBook, isLoading: loadingReject } = useRejectBook();

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  if (isLoading || loadingApprove || loadingReject)
    return (
      <LoadingSpinner
        isLoading={isLoading || loadingApprove || loadingReject}
      />
    );

  return (
    <section className="my-8">
      <div className="my-8 flex w-full items-center">
        <div className="mx-auto w-[300px]">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/assets/images/books/${book.mainImage}`}
            alt="Book cover"
            className="aspect-[2.4/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
          />
        </div>
      </div>
      <InfoDisplay label="Id" value={book.id} />
      <InfoDisplay label="Title " value={book.title} />
      <InfoDisplay label="Price" value={book.price} additionalValue={"$"} />
      <InfoDisplay
        label="Discount Percentage"
        value={book.discountPercentage}
        additionalValue={"%"}
      />
      <InfoDisplay
        label="Discount Price "
        value={
          book && book.price - (book.price * book.discountPercentage) / 100
        }
        additionalValue={"$"}
      />
      <InfoDisplay label="Rating " value={book.rating} />
      <InfoDisplay
        label="Genres  "
        value={book.genres.map((genre) => genre.name).join(", ")}
      />
      <InfoDisplay
        label="Status"
        value={
          (book.status === 1 && (
            <div className="my-4 rounded-3xl bg-yellow-500 px-8 py-4 text-center text-xl font-light text-white">
              Pending
            </div>
          )) ||
          (book.status === 0 && (
            <div className="my-4 rounded-3xl bg-green-500  px-8 py-4 text-center text-xl font-light text-white">
              Approved
            </div>
          )) ||
          (book.status === 2 && (
            <div className="my-4 rounded-3xl bg-red-500 px-8 py-4 text-center text-xl font-light text-white">
              Rejected
            </div>
          ))
        }
      />
      <Accordion sx={{ marginTop: "8px" }}>
        <AccordionSummary expandIcon={<ArrowBigDown />}>
          Desciption
        </AccordionSummary>
        <AccordionDetails>
          <p className="text-xl font-medium text-secondartTextBold">
            {book.description}
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ marginTop: "8px" }}>
        <AccordionSummary expandIcon={<ArrowBigDown />}>
          Author
        </AccordionSummary>
        <AccordionDetails>
          <InfoDisplay label="Author Id " value={book.author.id} />

          <Link
            to={`/admin/authors/${book.author.id}`}
            className="w-full text-xl font-medium text-secondartTextBold"
          >
            <InfoDisplay label="Name " value={book.author.name} />
          </Link>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ marginTop: "8px" }}>
        <AccordionSummary expandIcon={<ArrowBigDown />}>
          More Details
        </AccordionSummary>
        <AccordionDetails>
          <InfoDisplay label="Sold Quantity " value={book.soldQuantity} />
          <InfoDisplay label="Stock Quantity" value={book.stockQuantity} />
          <InfoDisplay label="Review count  " value={book.numberOfRatings} />
        </AccordionDetails>
      </Accordion>
      {book.company && (
        <Accordion sx={{ marginTop: "8px" }}>
          <AccordionSummary expandIcon={<ArrowBigDown />}>
            Owner
          </AccordionSummary>
          <AccordionDetails>
            <InfoDisplay label="Id " value={book.company.user.id} />
            <InfoDisplay label="Fullname " value={book.company.user.fullName} />
            <div className="flex">
              <Link
                to={`/admin/users/${book.company.user.id}`}
                className="ml-[12px] mt-8"
              >
                <span className="rounded-3xl bg-[#F65D4E] px-8 py-4 text-white">
                  More Details
                </span>
              </Link>
            </div>
          </AccordionDetails>
        </Accordion>
      )}
      {book.status === 1 && (
        <div className="flex gap-4">
          <div
            className="my-4 w-full cursor-pointer rounded-3xl bg-green-500 py-4 text-center text-white"
            onClick={() => approveMutate(book.id)}
          >
            Approved
          </div>

          <div
            className="my-4 w-full cursor-pointer rounded-3xl bg-red-500 py-4 text-center text-white"
            onClick={() => rejectBook(book.id)}
          >
            Rejected
          </div>
        </div>
      )}
    </section>
  );
};

export default BookDetailsView;
