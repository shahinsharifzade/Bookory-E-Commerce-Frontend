import React from "react";

const GenreItem = (props) => {
  return (
    <div>
      <div>
        <div className="relative h-[23rem] rounded-[2rem] max-minw-xsm:w-[300px]">
          <img
            src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/h1-cat2.jpg"
            alt="Genres Cover"
            className="aspect-[2/3.6] h-full w-full rounded-[2rem] object-cover"
          />
          <div className="absolute bottom-0 left-0 z-40">
            <h5 className="p-12 text-[2rem] font-semibold text-white">
              {props.genres.name}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreItem;
