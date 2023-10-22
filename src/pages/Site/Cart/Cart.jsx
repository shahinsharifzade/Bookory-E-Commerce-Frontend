import React, { useEffect, useState } from "react";
import Title from "../../../components/ui/Title/Title";
import CartItemsList from "./CartItemsList";
import { useGetBasketItems } from "../../../service/cartService";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import { useSelector } from "react-redux";

const Cart = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const {
    data: basket,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetBasketItems();

  useEffect(() => {
    if (isError) {
      if (error?.response.data.statusCode === 404) navigate("notfound");
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      const newTotal = basket.reduce((prevTotal, basketItem) => {
        return (
          prevTotal +
          parseFloat(basketItem.quantity) *
            ((parseFloat(basketItem.price) *
              parseFloat(basketItem.basketBook.discountPercentage)) /
              100)
        );
      }, 0);
      const roundedTotal = newTotal.toFixed(2);
      setTotal(roundedTotal);
    }
  }, [basket, isSuccess]);

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  if (basket.length === 0)
    return (
      <div className="container flex flex-col items-center justify-center py-[15rem] text-[3rem] font-semibold text-secondartTextBold">
        <div>Your Cart is Empty</div>
        <button
          className="mx-auto my-12 flex items-center rounded-[2rem] bg-primaryText px-16 py-6 text-xl text-white active:scale-95 active:shadow-xl"
          onClick={() => navigate("/shop")}
        >
          Back to Shop page
        </button>
      </div>
    );

  return (
    <section>
      <Title
        title={"Cart"}
        secondaryNav={"Cart"}
        mainNav={"Home"}
        secondaryNavDisplay={"hidden"}
      />

      <div className="container my-24 flex flex-col minw-lg:flex-row">
        <CartItemsList basket={basket} />
        <div className="ml-8 h-min w-[250px] shrink-0 rounded-3xl bg-secondaryText px-8 py-8 ">
          <h1 className="border-b border-solid border-white pb-4 text-[2.2rem] text-secondartTextBold">
            Order Summary
          </h1>
          <div className="flex gap-4 py-8 text-secondartTextBold">
            <p>Subtotal : </p>
            <span className="text-primaryText">{totalPrice} $</span>
          </div>

          <div className="flex gap-4 py-8 text-secondartTextBold">
            <p>Discount Price : </p>
            <span className="text-primaryText">{total} $</span>
          </div>

          <div className="flex gap-4 border-t border-solid border-white py-8 text-secondartTextBold">
            <p>Total : </p>
            <span className="text-primaryText">{totalPrice - total} $</span>
          </div>

          <button
            className="mx-auto my-8 flex items-center rounded-[2rem] bg-primaryText px-16 py-6 text-xl text-white active:scale-95 active:shadow-xl"
            onClick={() => navigate("/address")}
          >
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
