import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import InfoDisplay from "../../../components/ui/InfoDisplay/InfoDisplay";
import { useGetContactById } from "../../../service/contactService";
import { ArrowBigDown } from "lucide-react";
import { format } from "date-fns";

const ContactDetails = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();

  const formatDate = (date) => {
    const formattedDate = format(new Date(date), "d MMMM yyyy");
    return formattedDate;
  };

  const {
    data: contact,
    isError,
    isLoading,
    error,
  } = useGetContactById(contactId);

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <section className="my-8">
      <InfoDisplay label="Id" value={contact.id} />
      <InfoDisplay label="Date " value={formatDate(contact.createdAt)} />
      <InfoDisplay label="Name " value={contact.name} />
      <InfoDisplay label="Email " value={contact.email} />
      <Accordion>
        <AccordionSummary expandIcon={<ArrowBigDown />}>
          Message
        </AccordionSummary>
        <AccordionDetails>
          <p className="font-medium text-secondartTextBold">
            {contact.message}
          </p>
        </AccordionDetails>
      </Accordion>
    </section>
  );
};

export default ContactDetails;
