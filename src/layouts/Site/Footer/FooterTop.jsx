import React from "react";
import Logo from "../../../assets/icons/logo.svg";

import SocialLink from "../../../components/ui/SocialLink/SocialLink";
import {
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  PhoneCall,
} from "lucide-react";

const FooterTop = () => {
  const socialLinks = [
    {
      href: "https://www.instagram.com/sahin_sf/",
      icon: <Instagram size="14px" />,
    },
    {
      href: "https://twitter.com/sahin_sf",
      icon: <Twitter size="14px" />,
    },
    {
      href: "https://www.facebook.com/sahin_sf",
      icon: <Facebook size="14px" />,
    },
    {
      href: "https://www.linkedin.com/in/sahin_sf",
      icon: <Linkedin size="14px" />,
    },
  ];

  return (
    <div className="container">
      <div className="flex flex-row flex-wrap items-center  justify-between minw-lg:flex-nowrap">
        <div className="flex flex-wrap justify-center pb-4 max-minw-lg:w-full minw-lg:shrink-0">
          <div className="flex flex-row flex-wrap ">
            <div className="flex flex-col pb-12 pr-12">
              <a href="#" className="pb-12">
                <img src={Logo} alt="Logo" />
              </a>
              <p className="pb-8 text-xl font-light text-secondaryText">
                1418 River Drive, Suite 35 Cottonhall, <br /> CA 9622
              </p>
              <a className="pb-8 text-xl underline" href="#">
                SHOW ON MAP
              </a>
              <div className="space-x-5">
                {socialLinks.map((link, index) => (
                  <SocialLink key={index} href={link.href} icon={link.icon} />
                ))}
              </div>
            </div>

            <div className="border-l-[1px] border-solid border-secondaryText pl-12 pr-16 max-[594px]:border-0 max-[594px]:p-0  ">
              <ul className="text-white">
                <li className="pb-8">Need Help</li>
                <li className="pb-8 text-[2.2rem] text-primaryText">
                  +(84) - 1800 - 4635
                </li>
                <li className="text-xl font-light text-secondaryText">
                  Monday – Friday: 9:00-20:00
                </li>
                <li className="pb-8 text-xl font-light text-secondaryText">
                  Saturday: 11:00 – 15:00
                </li>
                <li className="pb-8 text-[1.8rem] font-normal">
                  contact@example.com
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-row justify-between max-[340px]:flex-col">
          <div className="pb-6 pl-6">
            <p className=" text-white">Explore</p>
            <ul className="text-xl font-light text-secondaryText">
              <li className="pb-6">
                <a href="#">About Us</a>
              </li>
              <li className="pb-6">
                <a href="#">Sitemap</a>
              </li>
              <li className="pb-6">
                <a href="#">Bookmarks</a>
              </li>
              <li className="pb-6">
                <a href="#">Sign in/ Join</a>
              </li>
            </ul>
          </div>

          <div className="pb-6 pl-6">
            <p className=" text-white">Our Service</p>
            <ul className="text-xl font-light text-secondaryText">
              <li className="pb-6">
                <a href="#">Help Center</a>
              </li>
              <li className="pb-6">
                <a href="#">Returns</a>
              </li>
              <li className="pb-6">
                <a href="#">Product Recalls</a>
              </li>
              <li className="pb-6">
                <a href="#">Accessability</a>
              </li>
              <li className="pb-6">
                <a href="#">Contact Us</a>
              </li>
              <li className="pb-6">
                <a href="#">Store Pickup</a>
              </li>
            </ul>
          </div>

          <div className="pb-6 pl-6">
            <p className=" text-white">Categories</p>
            <ul className="text-xl font-light text-secondaryText">
              <li className="pb-6">
                <a href="#">Action</a>
              </li>
              <li className="pb-6">
                <a href="#">Comedy</a>
              </li>
              <li className="pb-6">
                <a href="#">Drama</a>
              </li>
              <li className="pb-6">
                <a href="#">Horror</a>
              </li>
              <li className="pb-6">
                <a href="#">Kids</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
