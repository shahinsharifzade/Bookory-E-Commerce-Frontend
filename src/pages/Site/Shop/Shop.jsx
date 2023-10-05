import React, { useState } from "react";
import ShopBooksList from "./ShopBooksList";
import Title from "../../../components/ui/Title/Title";
import SidebarFilter from "./SidebarFilter";
import CenterBarFilter from "./CenterBarFilter";

const Shop = () => {
  const [MuiDrawer, setMuiDrawer] = useState(false);

  return (
    <section>
      <Title
        title={"Shop"}
        mainNav={"HOME"}
        secondaryNav={"SHOP"}
        secondaryNavDisplay={"hidden"}
      />

      <SidebarFilter MuiDrawer={MuiDrawer} setMuiDrawer={setMuiDrawer} />
      <CenterBarFilter setMuiDrawer={setMuiDrawer} />
      <ShopBooksList />
    </section>
  );
};

export default Shop;
