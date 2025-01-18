import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import InfoDisplay from "../../../components/ui/InfoDisplay/InfoDisplay";
import { useGetOrderById } from "../../../service/orderService";
import { ArrowBigDown } from "lucide-react";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const { data: order, isError, isLoading, error } = useGetOrderById(orderId);
  console.log("🚀 ~ file: OrderDetails.jsx:13 ~ OrderDetails ~ order:", order);

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <section className="my-8">
      <InfoDisplay label="Total " value={order.total} additionalValue={"$"} />
      <InfoDisplay label="Id " value={order.id} />

      <Accordion sx={{ marginTop: "8px" }}>
        <AccordionSummary
          aria-controls="panel2a-content"
          id="panel2a-header"
          expandIcon={<ArrowBigDown />}
        >
          <p>Ordered Books</p>
        </AccordionSummary>

        <AccordionDetails>
          <div className="flex flex-wrap gap-8">
            {order.orderItems.map((orderitem, index) => {
              return (
                <div className="text-xl ">
                  <div
                    className="w-[200px] shrink-0 rounded-[1rem]"
                    key={index}
                  >
                    <img
                      src={`${process.env.REACT_APP_IMR_SRC}/assets/images/books/${orderitem.book.mainImage}`}
                      className="aspect-[2.3/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
                      alt="Book cover"
                    />
                  </div>
                  <div className="ml-4 mt-4">
                    <p>Title :{orderitem.book.title}</p>
                    <p>
                      Price :{" "}
                      {orderitem.book &&
                        orderitem.book.price -
                          (orderitem.book.price *
                            orderitem.book.discountPercentage) /
                            100}{" "}
                      $
                    </p>
                    <p>Quantity : {orderitem.quantity}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ marginTop: "8px" }}>
        <AccordionSummary
          aria-controls="panel2a-content"
          id="panel2a-header"
          expandIcon={<ArrowBigDown />}
        >
          User
        </AccordionSummary>

        <AccordionDetails>
          <div>
            <InfoDisplay label="Id " value={order.user.id} />
            <InfoDisplay label="Username " value={order.user.userName} />
            <InfoDisplay label="Fullname " value={order.user.fullName} />
            <InfoDisplay label="Email " value={order.user.email} />
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ marginTop: "8px" }}>
        <AccordionSummary
          aria-controls="panel2a-content"
          id="panel2a-header"
          expandIcon={<ArrowBigDown />}
        >
          <p>Address</p>
        </AccordionSummary>

        <AccordionDetails>
          <div>
            <InfoDisplay label="Id " value={order.useraddress.id} />
            <InfoDisplay
              label="Address Line 1 "
              value={order.useraddress.addressLine1}
            />
            <InfoDisplay label="Mobile " value={order.useraddress.mobile} />
            <InfoDisplay label="Email " value={order.user.email} />
          </div>
        </AccordionDetails>
      </Accordion>
    </section>
  );
};

export default OrderDetails;
