import { Smartphone, User2 } from "lucide-react";
import React from "react";

const DeliveryAddressItem = ({
  address,
  setSelectedAddress,
  selectedAddress,
}) => {
  const handleClick = () => {
    setSelectedAddress(address);
  };

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
        <div className="flex items-center justify-between ">
          <p className="flex items-center gap-2">
            <User2 size={14} color="#f65d4e" /> {address.addressLine1}
          </p>
          <p className="flex items-center gap-2">
            <Smartphone size={14} color="#f65d4e" /> {address.mobile}
          </p>
        </div>

        <div>{address.addressLine2}</div>

        <div>
          <p>
            {address.city} / {address.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddressItem;
