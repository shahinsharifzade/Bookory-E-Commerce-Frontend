import React from "react";

const HeaderSearchItem = ({ item }) => {
  return (
    <li key={item.id}>
      <a href="#" className="flex items-center px-4 py-4">
        <div>
          <img
            src={`https://localhost:7047/assets/images/books/${item.mainImage}`}
            alt={`${item.title} cover`}
            className="h-28 w-20 object-cover"
          />
        </div>

        <p className="pl-4 font-medium text-black">{item.title}</p>
      </a>
    </li>
  );
};

export default HeaderSearchItem;
