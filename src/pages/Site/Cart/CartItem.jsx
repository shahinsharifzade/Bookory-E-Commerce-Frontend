import { TableCell, TableRow } from "@mui/material";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCartItem,
  useUpdateCartItem,
} from "../../../service/cartService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import BookPrice from "../../../components/ui/Book/BookPrice";

const CartItem = ({ basketItem }) => {
  const book = basketItem.basketBook;
  const [basketCount, setBasketCount] = useState(basketItem.quantity);

  const { mutate: deleteItem, deleteIsLoading } = useDeleteCartItem();
  const { mutate: updateItem, updateIsLoading } = useUpdateCartItem();

  useEffect(() => {
    updateItem({ Id: book.id, Quantity: basketCount });
  }, [basketCount]);

  if (deleteIsLoading || updateIsLoading)
    return <LoadingSpinner isLoading={deleteIsLoading || updateIsLoading} />;

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        "& .MuiTableCell-root": {
          fontSize: "16px",
          fontFamily: "Sora",
          borderRadius: "1px",
        },
      }}
    >
      <TableCell>
        <div className="flex items-center tracking-wider">
          <Link to={`/shop/${book.id}`}>
            <div className="w-[7rem] shrink-0 rounded-[1rem] minw-lg:w-[10rem]">
              <img
                src={`${process.env.REACT_APP_IMR_SRC}/assets/images/books/${book.mainImage}`}
                className="aspect-[2.3/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
                alt="book cover"
              />
            </div>
          </Link>

          <Link to={`/shop/${book.id}`}>
            <div className="pl-8 ">
              <h3 className="overflow-hiddentext-lg line-clamp-1 font-semibold transition-all duration-200 ease-linear hover:text-primaryText minw-md:text-2xl">
                {book.title}
              </h3>

              <BookPrice book={book} priceClasses={"text-[18px] mt-4 "} />
            </div>
          </Link>
        </div>
      </TableCell>

      <TableCell>
        <div className="mx-auto flex w-min items-center">
          <div
            className="h-full cursor-pointer rounded-l-[3rem] border-[1px] border-solid border-secondaryText border-r-transparent px-8 py-6 hover:bg-primaryText hover:text-white active:scale-95 active:shadow-xl"
            onClick={() => {
              setBasketCount((prevCount) =>
                prevCount > 1 ? prevCount - 1 : 1,
              );
            }}
          >
            -
          </div>

          <input
            type="number"
            min={1}
            max={999}
            value={basketCount}
            onChange={(e) => {
              setBasketCount(parseInt(e.target.value));
            }}
            className="border-y-[1px] px-4 py-6 text-center
                  !outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />

          <div
            className="h-full cursor-pointer rounded-r-[3rem] border-[1px] border-solid border-secondaryText border-l-transparent px-8 py-6 hover:bg-primaryText  hover:text-white active:scale-95 active:shadow-xl"
            onClick={() => {
              setBasketCount((prev) => prev + 1);
            }}
          >
            +
          </div>
        </div>
      </TableCell>

      <TableCell>
        {book &&
          (
            (book.price - (book.price * book.discountPercentage) / 100) *
            basketCount
          ).toFixed(2)}{" "}
        $
      </TableCell>

      <TableCell
        component="th"
        scope="row"
        sx={{ width: "min-content", padding: "0px" }}
      >
        <div className="cursor-pointer" onClick={() => deleteItem(book.id)}>
          <Trash2 size={34} className="pr-4" color="#f65d4e" />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
