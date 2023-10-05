import React from "react";
import {
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  PhoneCall,
} from "lucide-react";
import SocialLink from "../../../components/ui/SocialLink/SocialLink";

const HeaderTop = () => {
  const socialLinks = [
    {
      href: "https://www.instagram.com/sahin_sf/",
      icon: <Instagram color="#fff" size="14px" />,
    },
    {
      href: "https://twitter.com/sahin_sf",
      icon: <Twitter color="#fff" size="14px" />,
    },
    {
      href: "https://www.facebook.com/sahin_sf",
      icon: <Facebook color="#fff" size="14px" />,
    },
    {
      href: "https://www.linkedin.com/in/sahin_sf",
      icon: <Linkedin color="#fff" size="14px" />,
    },
  ];

  return (
    <section className="flex min-h-[4.4rem] items-center bg-[#282828] text-lg text-white">
      <div className="container flex flex-row items-center justify-between">
        <div className="flex flex-row">
          <a
            href="#"
            className="mr-14 cursor-pointer text-white hover:text-primaryText"
          >
            Find a bookstore
          </a>
          <div className="flex items-center">
            <PhoneCall size="1.5rem" className="ml-3 text-primaryText" />
            <p className="ml-3 cursor-pointer hover:text-primaryText">
              +1 840 - 841 25 69
            </p>
          </div>
        </div>

        <div className="space-x-5">
          {socialLinks.map((link, index) => (
            <SocialLink key={index} href={link.href} icon={link.icon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeaderTop;
