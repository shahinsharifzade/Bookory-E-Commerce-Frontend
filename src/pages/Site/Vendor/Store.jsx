import React, { useState } from "react";
import Title from "../../../components/ui/Title/Title";
import CenterBarFilter from "./CenterBarFilter";
import SearchStore from "./SearchStore";
import StoreList from "./StoreList";

const Vendor = () => {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <Title
        title={"store"}
        mainNav={"home"}
        secondaryNav={"store"}
        secondaryNavDisplay={"hidden"}
      />

      <CenterBarFilter open={open} setOpen={setOpen} />
      <SearchStore open={open} />
      <StoreList />
    </section>
  );
};

export default Vendor;
