import React from "react";
import Title from "../../../components/ui/Title/Title";
import WishlistItems from "./WishlistItems";

const Wishlist = () => {
  return (
    <section>
      <Title
        title={"Wishlist"}
        secondaryNav={"wishlist"}
        mainNav={"Home"}
        secondaryNavDisplay={"hidden"}
      />

      <WishlistItems />
    </section>
  );
};

export default Wishlist;
