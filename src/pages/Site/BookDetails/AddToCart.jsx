import React, { useState } from "react";
import { ShoppingBasket } from "lucide-react";
import { useAddToCart } from "../../../service/cartService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";

const AddToCart = ({ book, displayQuantityTitle }) => {
  const [basketCount, setBasketCount] = useState(1);

  const { mutate, isLoading } = useAddToCart();
  const handleAddToCart = (e) => {
    e.preventDefault();
    mutate({ Id: book.id, Quantity: basketCount });
  };

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <>
      <div className="relative">
        <p className="absolute top-[-20px] pb-4 text-xl font-light text-secondartTextBold">
          Quantity
        </p>
        <div className="flex items-center">
          <div
            className="h-full cursor-pointer rounded-l-[3rem] border-[1px] border-solid border-secondaryText border-r-transparent px-8 py-6 hover:bg-primaryText hover:text-white active:scale-95 active:shadow-xl"
            onClick={() => setBasketCount((prev) => prev - 1)}
          >
            -
          </div>
          <input
            type="number"
            min={1}
            max={999}
            value={basketCount}
            onChange={(e) => setBasketCount(parseInt(e.target.value))}
            className="border-y-[1px] px-4 py-6 text-center
                  !outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <div
            className="h-full cursor-pointer rounded-r-[3rem] border-[1px] border-solid border-secondaryText border-l-transparent px-8 py-6 hover:bg-primaryText  hover:text-white active:scale-95 active:shadow-xl"
            onClick={() => setBasketCount((prev) => prev + 1)}
          >
            +
          </div>
        </div>
      </div>
      <div>
        <form onSubmit={handleAddToCart}>
          <button
            type="submit"
            className="flex items-center rounded-[3rem] bg-primaryText px-8 py-6 active:scale-95 active:shadow-xl"
          >
            <ShoppingBasket color="white" />
            <p className="pl-4 text-white">Add to cart</p>
          </button>
        </form>
      </div>
    </>
  );
};

export default AddToCart;
