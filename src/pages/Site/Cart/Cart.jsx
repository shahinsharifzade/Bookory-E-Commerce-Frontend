import React from "react";
import Title from "../../../components/ui/Title/Title";

const Cart = () => {
  return (
    <section>
      <Title
        title={"Cart"}
        secondaryNav={"Cart"}
        mainNav={"Home"}
        secondaryNavDisplay={"hidden"}
      />
    </section>
  );
};

export default Cart;
