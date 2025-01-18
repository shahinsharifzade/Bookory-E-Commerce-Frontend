import { TableCell, TableRow } from "@mui/material";
import { Trash2 } from "lucide-react";
import React from "react";
import { useDeleteItem } from "../../../service/wishlistService";
import { Link } from "react-router-dom";
import AddToCart from "../BookDetails/AddToCart";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";

const WishlistItem = ({ book }) => {
  const { mutate: deleteMutate, isLoading: removeItemIsLoading } =
    useDeleteItem();

  if (removeItemIsLoading)
    return <LoadingSpinner isLoading={removeItemIsLoading} />;

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
      <TableCell component="th" scope="row">
        <div className="flex items-center">
          <div className="cursor-pointer" onClick={() => deleteMutate(book.id)}>
            <Trash2 size={34} className="pr-4" color="#f65d4e" />
          </div>

          <Link to={`/shop/${book.id}`}>
            <div className="w-[70px] shrink-0 rounded-[1rem]">
              <img
                src={`${process.env.REACT_APP_BASE_URL}/assets/images/books/${book.mainImage}`}
                className="aspect-[2.3/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
                alt="book cover"
              />
            </div>
          </Link>

          <Link to={`/shop/${book.id}`}>
            <h3 className="line-clamp-1 overflow-hidden pl-8 text-lg font-semibold transition-all duration-200 ease-linear hover:text-primaryText minw-md:text-2xl">
              {book.title}
            </h3>
          </Link>
        </div>
      </TableCell>

      <TableCell component="th" align="center" scope="row">
        {book.price - (book.price * book.discountPercentage) / 100}$
      </TableCell>

      <TableCell
        component="th"
        align="center"
        scope="row"
        className="flex justify-center"
      >
        <div className="mx-auto inline-block">
          {book.stockQuantity !== 0 ? (
            <div className="w-max rounded-lg bg-[#82d17533] px-4 py-2 text-lg font-light text-[#82d175]">
              IN STOCK
            </div>
          ) : (
            <div className="w-max rounded-lg bg-[#e6393933] px-4 py-2 text-lg font-light text-[#e63939]">
              OUT OF STOCK
            </div>
          )}
        </div>
      </TableCell>

      <TableCell component="th" scope="row">
        <div className="my-2 flex flex-row justify-around gap-6 text-lg max-[1100px]:flex-col">
          <AddToCart book={book} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default WishlistItem;
