import React from "react";

const InfoDisplay = ({ label, value, additionalValue }) => {
  return (
    <div className="my-2 flex items-center rounded-[4px] border border-solid border-secondaryText shadow-sm">
      <p className="mx-[16px] py-[12px]">{label} :</p>
      <p className="text-secondartTextBold">
        {value} {additionalValue}
      </p>
    </div>
  );
};

export default InfoDisplay;
