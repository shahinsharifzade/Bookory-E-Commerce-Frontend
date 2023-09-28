import React from "react";
import ShopBooksList from "./ShopBooksList";
import Title from "../../../components/ui/Title/Title";

const Shop = () => {
  return (
    <section>
      <Title
        title={"Shop"}
        mainNav={"HOME"}
        secondaryNav={"SHOP"}
        secondaryNavDisplay={"hidden"}
      />
      <ShopBooksList />
    </section>
  );
};

export default Shop;
