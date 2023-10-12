import React from "react";
import { Star } from "lucide-react";

const Rating = ({ rating }) => {
  const ratingStars = [];

  for (let index = 0; index < 5; index++) {
    if (index < rating) {
      ratingStars.push(
        <Star key={index} color="#f65d4e" fill="#f65d4e" size={"14px"} />,
      );
    } else {
      ratingStars.push(<Star key={index} color="#f65d4e" size={"14px"} />);
    }
  }

  return <div className="flex">{ratingStars}</div>;
};

export default Rating;
