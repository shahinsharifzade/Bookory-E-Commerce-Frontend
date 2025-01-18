import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import InfoDisplay from "../../../components/ui/InfoDisplay/InfoDisplay";
import {
  useApproveCompany,
  useGetById,
  useRejectCompany,
} from "../../../service/companyService";
import { ArrowBigDown } from "lucide-react";

const StoreDetails = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();

  const { data: company, isError, isLoading, error } = useGetById(storeId);
  const { mutate: approveMutate, isLoading: loadingApprove } =
    useApproveCompany();
  const { mutate: rejectBook, isLoading: loadingReject } = useRejectCompany();

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
      <InfoDisplay label="Id" value={company.id} />
      <InfoDisplay label="Name " value={company.name} />
      <InfoDisplay label="Contact Email " value={company.contactEmail} />
      <InfoDisplay label="Contact Phone" value={company.contactPhone} />
      <InfoDisplay label="Rating " value={company.rating} />
      <InfoDisplay
        label="Status"
        value={
          (company.status === 0 && (
            <div className="my-4 rounded-3xl bg-yellow-500 px-8 py-4 text-center text-xl font-light text-white">
              Pending
            </div>
          )) ||
          (company.status === 1 && (
            <div className="my-4 rounded-3xl bg-green-500  px-8 py-4 text-center text-xl font-light text-white">
              Approved
            </div>
          )) ||
          (company.status === 2 && (
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
            {company.description}
          </p>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ marginTop: "8px" }}>
        <AccordionSummary expandIcon={<ArrowBigDown />}>Owner</AccordionSummary>
        <AccordionDetails>
          <InfoDisplay label="Id " value={company.user.id} />
          <InfoDisplay label="Fullname " value={company.user.fullName} />
          <div className="flex">
            <Link
              to={`/admin/users/${company.user.id}`}
              className="ml-[12px] mt-8"
            >
              <span className="rounded-3xl bg-[#F65D4E] px-8 py-4 text-white">
                More Details
              </span>
            </Link>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ marginTop: "8px" }}>
        <AccordionSummary expandIcon={<ArrowBigDown />}>
          <p>Books</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-wrap gap-8">
            {company.books.length ? (
              company.books.map((book, index) => {
                return (
                  <div>
                    <div
                      className="w-[200px] shrink-0 rounded-[1rem]"
                      key={index}
                    >
                      <img
                        src={`${process.env.REACT_APP_IMR_SRC}/assets/images/books/${book.mainImage}`}
                        className="aspect-[2.3/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
                        alt="Author cover"
                      />
                    </div>
                    <div className="ml-4">
                      <p className=" overflow-hidden">{book.title}</p>
                      <p>
                        Price :{" "}
                        {book &&
                          book.price -
                            (book.price * book.discountPercentage) / 100}{" "}
                        $
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-primaryText">Not found</p>
            )}
          </div>
        </AccordionDetails>
      </Accordion>

      {company.status === 0 && (
        <div className="flex gap-4">
          <div
            className="my-4 w-full cursor-pointer rounded-3xl bg-green-500 py-4 text-center text-white"
            onClick={() => approveMutate(company.id)}
          >
            Approved
          </div>

          <div
            className="my-4 w-full cursor-pointer rounded-3xl bg-red-500 py-4 text-center text-white"
            onClick={() => rejectBook(company.id)}
          >
            Rejected
          </div>
        </div>
      )}
    </section>
  );
};

export default StoreDetails;
