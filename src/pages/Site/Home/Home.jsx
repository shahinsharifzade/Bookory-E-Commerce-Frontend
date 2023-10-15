import React, { useEffect } from "react";
import Banner from "./Banner";
import Bestsellers from "./Bestsellers";
import Deals from "./Deals";
import Trends from "./Trends";
import Quote from "./Quote";
import PopularBooks from "./PopularBooks";
import KeepReading from "./KeepReading";
import PopularAuthors from "./PopularAuthors";
import Genre from "./Genres";
import BooksInformation from "../../../components/ui/Information/BooksInformation";
import Information from "./Information";
import { useSelector } from "react-redux";
import { usePrivateApi } from "../../../api";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  console.log(token);

  // const api = usePrivateApi();

  // const fetchBook = async () => {
  //   const response = await api.get("/blog");
  //   console.log(response, "asiman");
  //   return response.data;
  // };

  // const query = useQuery({
  //   queryFn: fetchBook,
  //   queryKey: ["sakan"],
  // });

  return (
    <>
      <Banner />
      <Bestsellers />
      <Deals />
      <Trends />
      <Quote />
      <PopularBooks />
      <Genre />
      <div className="container mb-[8rem] flex flex-col minw-md:flex-row">
        <PopularAuthors />
        <KeepReading />
      </div>
      <Information />
    </>
  );
};

export default Home;
