import React from "react";
import Banner from "./Banner";
import Bestsellers from "./Bestsellers";
import Deals from "./Deals";
import Trends from "./Trends";
import Quote from "./Quote";
import PopularBooks from "./PopularBooks";
import KeepReading from "./KeepReading";
import PopularAuthors from "./PopularAuthors";
import Genre from "./Genres";

const Home = () => {
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
    </>
  );
};

export default Home;
