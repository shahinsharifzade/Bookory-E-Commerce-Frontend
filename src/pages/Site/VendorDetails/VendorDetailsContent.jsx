import React from "react";
import VendorDetailsBanner from "./VendorDetailsBanner";
import CenterBarFilter from "./CenterBarFilter";
import VendorBooksList from "./VendorBooksList";
import SendMessageForm from "./SendMessageForm";

const VendorDetailsContent = ({ store, storeId }) => {
  return (
    <div className="container my-24 flex gap-8">
      <div className="w-[330px]">
        <SendMessageForm storeId={storeId} />
      </div>

      <div className="w-full ">
        <VendorDetailsBanner store={store} />
        {/* <CenterBarFilter /> */}
        <VendorBooksList storeId={storeId} />
      </div>
    </div>
  );
};

export default VendorDetailsContent;
