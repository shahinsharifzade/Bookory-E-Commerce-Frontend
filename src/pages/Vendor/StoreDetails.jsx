import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Modal,
} from "@mui/material";
import { ArrowBigDown } from "lucide-react";
import InfoDisplay from "../../components/ui/InfoDisplay/InfoDisplay";
import LoadingSpinner from "../../components/ui/Loading/LoadingSpinner";
import { Navigate } from "react-router-dom";
import { useGetByActiveVendor } from "../../service/companyService";
import UpdateCompanyForm from "./UpdateCompanyForm";

const VendorStoreDetails = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data: company, isError, isLoading, error } = useGetByActiveVendor();

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) Navigate("notfound");
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <section className="my-8">
      <InfoDisplay label="Id" value={company.id} />
      <InfoDisplay label="Name " value={company.name} />
      <InfoDisplay label="Contact Email " value={company.contactEmail} />
      <InfoDisplay label="Contact Phone" value={company.contactPhone} />
      <InfoDisplay label="Rating " value={company.rating} />

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

      <div
        className="my-4 w-full cursor-pointer rounded-3xl bg-orange-500 py-4 text-center text-white"
        onClick={handleOpen}
      >
        Update Store
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UpdateCompanyForm company={company} handleClose={handleClose} />
      </Modal>
    </section>
  );
};

export default VendorStoreDetails;
