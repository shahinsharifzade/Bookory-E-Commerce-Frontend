import React, { useState } from "react";
import { useGetAllAddress } from "../../../service/addressService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import DeliveryAddressItem from "./DeliveryAddressItem";
import AddressForm from "../../../components/form/AddressForm/AddressForm";
import { Backdrop, Modal } from "@mui/material";
import { Plus } from "lucide-react";

const DeliveryAddress = ({ selectedAddress, setSelectedAddress }) => {
  const { data: address, isLoading } = useGetAllAddress();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <div className="w-full">
      <div>
        <div>
          <h1 className="mb-8 text-[2.2rem]">Delivery Address</h1>
        </div>

        <div className="flex flex-wrap gap-8">
          <div className="flex w-[48%] cursor-pointer items-center justify-center rounded-[3rem] border border-solid border-secondaryText p-8 shadow-2xl">
            <div className="flex flex-col items-center">
              <div
                onClick={handleOpen}
                className="rounded-3xl bg-secondaryText p-4 "
              >
                <Plus size={20} color="#f65d4e" />
              </div>
              <p>Add New Shipping Address</p>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <AddressForm handleClose={handleClose} />
            </Modal>
          </div>

          {address &&
            address.map((item, index) => {
              return (
                <DeliveryAddressItem
                  setSelectedAddress={setSelectedAddress}
                  selectedAddress={selectedAddress}
                  address={item}
                  key={index}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
