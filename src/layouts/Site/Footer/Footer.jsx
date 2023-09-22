import React from "react";
import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";

const Footer = () => {
  return (
    <section className="bg-[#282828]">
      <div className="px-12 py-32">
        <FooterTop />
        <FooterBottom />
      </div>
    </section>
  );
};

export default Footer;
