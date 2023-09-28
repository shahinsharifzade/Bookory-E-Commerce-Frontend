import React from "react";
import AuthorBookItem from "./AuthorBookItem";

const AuthorBooks = ({ books }) => {
  console.log(books);
  return (
    <div className="container flex flex-wrap">
      {books.map((book, index) => (
        <AuthorBookItem key={index} book={book} />
      ))}
    </div>
  );
};

export default AuthorBooks;
