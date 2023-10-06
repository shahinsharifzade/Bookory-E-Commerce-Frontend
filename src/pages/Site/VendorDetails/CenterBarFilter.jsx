import React from "react";
import SearchVendorBooks from "./SearchVendorBooks";
import SortVendorBooks from "./SortVendorBooks";

const CenterBarFilter = () => {
  return (
    <div>
      <div>
        <div className="my-12 flex items-center justify-between">
          <SearchVendorBooks />
          <SortVendorBooks />
        </div>
      </div>
    </div>
  );
};

export default CenterBarFilter;
