import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import InfoDisplay from "../../../components/ui/InfoDisplay/InfoDisplay";
import { useGetUserById } from "../../../service/userService";
import { useGetOrderByUserId } from "../../../service/orderService";
import { format } from "date-fns";
import { ArrowBigDown } from "lucide-react";

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data, isError, isLoading, error } = useGetUserById(userId);

  const { data: orderDetails, isLoading: orderDetailIsLoading } =
    useGetOrderByUserId(userId);

  const formatDate = (date) => {
    const formattedDate = format(new Date(date), "d MMMM yyyy");
    return formattedDate;
  };

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  if (isLoading || orderDetailIsLoading)
    return <LoadingSpinner isLoading={isLoading || orderDetailIsLoading} />;

  return (
    <section className="my-8">
      <InfoDisplay label="Id" value={data.user.id} />
      <InfoDisplay label="Username " value={data.user.userName} />
      <InfoDisplay label="Fullname " value={data.user.fullName} />
      <InfoDisplay label="Email " value={data.user.email} />

      {console.log(data.isVendorRegistrationComplete)}
      {data.isVendorRegistrationComplete !== null ? (
        data.isVendorRegistrationComplete ? (
          <InfoDisplay label="Vendor Registration status  " value="Complete" />
        ) : (
          <InfoDisplay label="Vendor Registration status  " value="Pending" />
        )
      ) : null}
      <InfoDisplay label="Role " value={data.role} />

      <Accordion sx={{ marginTop: "8px" }}>
        <AccordionSummary
          aria-controls="panel2a-content"
          id="panel2a-header"
          expandIcon={<ArrowBigDown />}
        >
          <p>Orders</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className="gap-8">
            {orderDetails.map((orderDetail) => {
              return (
                <Accordion sx={{ marginTop: "8px" }}>
                  <AccordionSummary
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    expandIcon={<ArrowBigDown />}
                  >
                    <p>Order Date : {formatDate(orderDetail.createdAt)}</p>
                  </AccordionSummary>

                  <AccordionDetails>
                    <InfoDisplay label="Order Id " value={orderDetail.id} />
                    <InfoDisplay
                      label="Total "
                      value={orderDetail.total}
                      additionalValue={"$"}
                    />
                    <InfoDisplay
                      label="Address "
                      value={orderDetail.useraddress.addressLine1}
                    />
                    <div className="flex">
                      <Link
                        to={`/admin/orders/${orderDetail.id}`}
                        className="ml-[12px] mt-8"
                      >
                        <span className="rounded-3xl bg-[#F65D4E] px-8 py-4 text-white">
                          More Details
                        </span>
                      </Link>
                    </div>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>
    </section>
  );
};

export default UserDetails;
