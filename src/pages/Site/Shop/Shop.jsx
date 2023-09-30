import React, { useState } from "react";
import ShopBooksList from "./ShopBooksList";
import Title from "../../../components/ui/Title/Title";
import SidebarFilter from "./SidebarFilter";
import CenterBarFilter from "./CenterBarFilter";

const Shop = () => {
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedRating, setSelectedRating] = useState();
  const [sortBy, setSortBy] = useState("");
  const [MuiDrawer, setMuiDrawer] = useState(false);

  const handleGenresChange = (genres) => {
    setSelectedGenres(genres);
  };
  const handleAuthorsChange = (authors) => {
    setSelectedAuthors(authors);
  };
  const handlePriceRangeChnage = (range) => {
    setPriceRange(range);
  };
  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };
  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  return (
    <section>
      <Title
        title={"Shop"}
        mainNav={"HOME"}
        secondaryNav={"SHOP"}
        secondaryNavDisplay={"hidden"}
      />

      <SidebarFilter
        onAuthorsChange={handleAuthorsChange}
        onGenresChange={handleGenresChange}
        onPriceRangeChange={handlePriceRangeChnage}
        onRatingChange={handleRatingChange}
        MuiDrawer={MuiDrawer}
        setMuiDrawer={setMuiDrawer}
      />

      <CenterBarFilter setMuiDrawer={setMuiDrawer} onSortChange={setSortBy} />

      <ShopBooksList
        selectedAuthors={selectedAuthors}
        selectedGenres={selectedGenres}
        priceRange={priceRange}
        selectedRating={selectedRating}
        selectedSort={sortBy}
      />
    </section>
  );
};

export default Shop;
