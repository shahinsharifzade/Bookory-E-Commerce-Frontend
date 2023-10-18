import { Modal } from "@mui/material";
import { Pencil, Smartphone, User2 } from "lucide-react";
import React, { useState } from "react";
import AddressUpdateForm from "../../../components/form/AddressForm/AddressUpdateForm";

const DeliveryAddressItem = ({
  address,
  setSelectedAddress,
  selectedAddress,
}) => {
  const handleClick = () => {
    setSelectedAddress(address);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      className={`${
        selectedAddress?.id === address.id
          ? "border-[2px] border-primaryText"
          : "border-secondaryText"
      } w-[48%] cursor-pointer rounded-[2rem] border border-solid bg-white p-8  text-xl font-normal shadow-2xl`}
      onClick={handleClick}
    >
      <div>
        <div className="flex flex-col">
          <div
            onClick={() => setOpen(true)}
            className="flex w-min items-center gap-4 self-end text-[16px] text-primaryText"
          >
            <p>Edit </p>
            <Pencil size={14} color="#f65d4e" />
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <AddressUpdateForm address={address} handleClose={handleClose} />
          </Modal>
        </div>
        <div className="mb-2 flex items-center justify-between gap-4 ">
          <div className="flex items-center gap-2 ">
            <User2 size={14} color="#f65d4e" className="shrink-0" />{" "}
            <p className="line-clamp-1 overflow-hidden">
              {address.addressLine1}
            </p>
          </div>
          <p className=" flex items-center gap-2 ">
            <Smartphone size={14} color="#f65d4e" className="shrink-0" />
            <p className="line-clamp-1 overflow-hidden">{address.mobile}</p>
          </p>
        </div>

        <div className="mb-2 line-clamp-1 overflow-hidden">
          {address.addressLine2}
        </div>

        <div>
          <p className="line-clamp-1 overflow-hidden">
            {address.city} / {address.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddressItem;
