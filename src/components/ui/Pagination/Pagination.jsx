import React from "react";

const Pagination = ({ totalItems, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <nav className="mt-4">
      <ul className="flex justify-center space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <li
            key={index}
            className={`${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } rounded-full`}
          >
            <button
              className={`flex items-center justify-center px-4 py-2 focus:outline-none ${
                currentPage === index + 1 ? "font-semibold" : ""
              }`}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Pagination;
