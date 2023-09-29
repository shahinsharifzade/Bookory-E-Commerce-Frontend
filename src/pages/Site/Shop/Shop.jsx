import React, { useState } from "react";
import ShopBooksList from "./ShopBooksList";
import Title from "../../../components/ui/Title/Title";
import SidebarFilter from "./SidebarFilter";
import { MenuIcon } from "lucide-react";

const Shop = () => {
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [MuiDrawer, setMuiDrawer] = useState(false);

  const handleGenresChange = (genres) => {
    setSelectedGenres(genres);
  };
  const handleAuthorsChange = (authors) => {
    setSelectedAuthors(authors);
  };

  return (
    <section>
      <Title
        title={"Shop"}
        mainNav={"HOME"}
        secondaryNav={"SHOP"}
        secondaryNavDisplay={"hidden"}
      />
      <MenuIcon onClick={() => setMuiDrawer(true)} />

      <SidebarFilter
        onAuthorsChange={handleAuthorsChange}
        onGenresChange={handleGenresChange}
        MuiDrawer={MuiDrawer}
        setMuiDrawer={setMuiDrawer}
      />
      <div></div>
      <ShopBooksList selectedAuthors={selectedAuthors} />
    </section>
  );
};

export default Shop;
