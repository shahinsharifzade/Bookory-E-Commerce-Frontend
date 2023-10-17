import React, { useEffect, useState } from "react";
import Title from "../../../components/ui/Title/Title";
import DeliveryAddressList from "./DeliveryAddressList";
import { useNavigate } from "react-router-dom";
import { useGetBasketItems } from "../../../service/cartService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import StripePayment from "../../../components/ui/StripePayment/StripePayment";
import { Modal } from "@mui/material";

const Address = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [total, setTotal] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    data: basket,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetBasketItems();

  useEffect(() => {
    if (isSuccess) {
      const newTotal = basket.reduce(
        (prevTotal, basketItem) =>
          prevTotal +
          parseFloat(basketItem.quantity) * parseFloat(basketItem.price),
        0,
      );
      setTotal(newTotal);
    }
  }, [basket, isSuccess]);

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <section>
      <Title
        title={"Shipping Address"}
        mainNavDisplay={"hidden"}
        secondaryNavDisplay={"hidden"}
      />

      <div className="container my-24 flex flex-col minw-lg:flex-row">
        <DeliveryAddressList
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />

        <div className="ml-8 h-min w-[250px] shrink-0 rounded-[2rem] border border-solid border-primaryText px-8 py-8 ">
          <h1 className="border-b border-solid border-secondaryText pb-4 text-[2.2rem] text-secondartTextBold">
            Order Summary
          </h1>
          <div className="flex gap-4 py-8 text-secondartTextBold">
            <p>Total : </p>
            <span className="text-primaryText">{total}$</span>
          </div>

          <button
            className="my-8 flex w-full items-center justify-center rounded-[2rem] bg-primaryText px-16 py-6 text-xl text-white active:scale-95 active:shadow-xl"
            onClick={handleOpen}
            disabled={!selectedAddress}
          >
            Checkout
          </button>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StripePayment
          addressId={selectedAddress?.id}
          email={selectedAddress?.user?.email}
        />
      </Modal>
    </section>
  );
};

export default Address;
