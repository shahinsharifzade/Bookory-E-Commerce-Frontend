import React from "react";

const DiscountPercentage = ({ discountPercentage }) => {
  return (
    <>
      {discountPercentage !== 0 && (
        <span className="absolute left-[5%] top-[5%] flex h-20 w-20 items-center justify-center rounded-full bg-yellow-300">
          -{discountPercentage}%
        </span>
      )}
    </>
  );
};

export default DiscountPercentage;
