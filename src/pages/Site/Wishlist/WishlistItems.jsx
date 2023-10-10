import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import {
  useDeleteItem,
  useGetWishlist,
} from "../../../service/wishlistService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import AddToCart from "../BookDetails/AddToCart";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const WishlistItems = () => {
  const { data: wishlist, isLoading, isError } = useGetWishlist();
  const { mutate: deleteMutate, isLoading: removeItemIsLoading } =
    useDeleteItem();

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;
  if (removeItemIsLoading)
    return <LoadingSpinner isLoading={removeItemIsLoading} />;

  return (
    <div className="container mb-16 mt-24">
      <TableContainer sx={{ minWidth: "100%" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  fontSize: "16px",
                  background: "#e6e6e6",
                  fontFamily: "Sora",
                  color: "white",
                  borderRadius: "1px",
                },
              }}
            >
              <TableCell align="center">Product Name</TableCell>
              <TableCell align="center">Unit price</TableCell>
              <TableCell align="center">Stock Status</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wishlist.books.map((book, index) => (
              <TableRow
                key={index}
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
                    <div
                      className="cursor-pointer"
                      onClick={() => deleteMutate(book.id)}
                    >
                      <Trash2 size={34} className="pr-4" color="#f65d4e" />
                    </div>

                    <Link to={`/shop/${book.id}`}>
                      <div className="w-[70px] shrink-0 rounded-[1rem]">
                        <img
                          src={`https://localhost:7047/assets/images/books/${book.mainImage}`}
                          className="aspect-[2.3/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
                          alt="book cover"
                        />
                      </div>
                    </Link>

                    <Link to={`/shop/${book.id}`}>
                      <h3 className="line-clamp-1 overflow-hidden pl-8 font-semibold transition-all duration-200 ease-linear hover:text-primaryText">
                        {book.title}
                      </h3>
                    </Link>
                  </div>
                </TableCell>

                <TableCell component="th" align="center" scope="row">
                  {book.price}$
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
                  <div className="flex justify-around">
                    <AddToCart book={book} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WishlistItems;
