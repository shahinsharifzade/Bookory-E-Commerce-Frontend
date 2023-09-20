import React from "react";
import { User2, Heart, ShoppingBasket } from "lucide-react";

const HeaderIcons = () => {
  return (
    <div className="flex items-center font-normal">
      <a className="border-secondaryText cursor-pointer border-r border-solid text-black">
        <User2
          size={"2rem"}
          strokeWidth={"1.2px"}
          className="ml-2 mr-2 font-normal"
        />
      </a>
      <a className=" border-secondaryText cursor-pointer border-r border-solid text-black">
        <Heart
          size={"2rem"}
          strokeWidth={"1.2px"}
          className="ml-2 mr-2 font-normal"
        />
      </a>
      <a className="cursor-pointer  text-black">
        <ShoppingBasket
          size={"2rem"}
          strokeWidth={"1.2px"}
          className="ml-2 mr-2 font-normal"
        />
      </a>
    </div>
  );
};

export default HeaderIcons;
