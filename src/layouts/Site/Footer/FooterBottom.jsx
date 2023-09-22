import React from "react";
import Mastercard from "../../../assets/icons/mastercard.svg";
import Visa from "../../../assets/icons/visa.svg";
import AmericanExpress from "../../../assets/icons/americanExpress.svg";
import Paypal from "../../../assets/icons/paypal.svg";
import WesternUnion from "../../../assets/icons/westernUnion.svg";
import Bitcoin from "../../../assets/icons/bitcoin.svg";

const FooterBottom = () => {
  return (
    <section>
      <div className="container border-t-[1px] border-solid border-secondaryText py-8">
        <div className="flex flex-wrap items-center justify-between text-xl font-light text-white">
          <p className="pb-6">
            Copyright © 2022 <span className="text-primaryText"> Bookory</span>
            . All rights reserved.
          </p>
          <div className="flex gap-4">
            <img className="w-18 h-16" src={Mastercard} alt="" />
            <img className="h-16 w-16" src={Visa} alt="" />
            <img className="h-16 w-16" src={AmericanExpress} alt="" />
            <img className="h-16 w-16" src={Paypal} alt="" />
            <img className="w-18 h-16" src={WesternUnion} alt="" />
            <img className="h-16 w-16" src={Bitcoin} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterBottom;
