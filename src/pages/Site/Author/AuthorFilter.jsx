import React from "react";

const AuthorFilter = ({ selectedLetter, onFilterClick }) => {
  const letters = [
    "ALL",
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
  ];

  return (
    <div className="mb-20 pb-2">
      <div>
        <ul className="flex flex-wrap">
          {letters.map((letter) => (
            <li key={letter}>
              <a
                href="#"
                className={`mx-2 mt-4 px-4 text-lg text-[#999999] ${
                  selectedLetter === letter
                    ? "border-b-2 border-solid border-primaryText"
                    : ""
                }`}
                onClick={(e) => onFilterClick(e, letter)}
              >
                {letter}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AuthorFilter;
