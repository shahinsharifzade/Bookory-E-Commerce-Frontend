import React from "react";
import AuthorsList from "./AuthorsList";
import OnSaleBooks from "./OnSaleBooks";
import Title from "../../../components/ui/Title/Title";

const Author = () => {
  return (
    <section>
      <Title
        title={"All Authors"}
        mainNav={"HOME"}
        secondaryNav={"author"}
        secondaryNavDisplay={"hidden"}
      />
      <OnSaleBooks />
      <AuthorsList />
    </section>
  );
};

export default Author;
