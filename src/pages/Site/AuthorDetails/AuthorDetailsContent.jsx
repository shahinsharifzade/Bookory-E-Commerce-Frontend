import React from "react";
import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";
import SocialLink from "../../../components/ui/SocialLink/SocialLink";

const AuthorDetailsContent = ({ author }) => {
  const socialLinks = [
    {
      href: "https://www.instagram.com/sahin_sf/",
      icon: <Instagram size="14px" strokeWidth={"1px"} />,
    },
    {
      href: "https://twitter.com/sahin_sf",
      icon: <Twitter size="14px" strokeWidth={"1px"} />,
    },
    {
      href: "https://www.facebook.com/sahin_sf",
      icon: <Facebook size="14px" strokeWidth={"1px"} />,
    },
    {
      href: "https://www.linkedin.com/in/sahin_sf",
      icon: <Linkedin size="14px" strokeWidth={"1px"} />,
    },
  ];

  return (
    <div className="container pb-16 pt-24">
      <div className="flex flex-col minw-sm:flex-row">
        <div className="mb-12 h-[30rem] shrink-0 rounded-3xl max-minw-sm:mx-auto">
          <img
            src={`https://localhost:7047/assets/images/authors/${author.mainImage}`}
            className="aspect-[1/1] h-full rounded-3xl object-cover minw-sm:w-full"
            alt=""
          />
        </div>
        <div className="flex flex-col minw-lg:flex-row">
          <div className="pl-0 pr-12 text-xl leading-8 minw-sm:pl-28">
            <h2 className="mb-8 text-[3.6rem] font-semibold">{author.name}</h2>
            <p className="text-xl font-light text-[#444444]">
              {author.biography}
            </p>
          </div>
          <div className="flex flex-row border-none border-secondaryText p-0 pt-8 minw-sm:pl-24 minw-lg:flex-col minw-lg:border-l minw-lg:border-solid minw-lg:pr-8">
            {socialLinks.map((link, index) => (
              <div className="" key={index}>
                <SocialLink
                  href={link.href}
                  icon={link.icon}
                  classes={`rounded-full border border-solid border-secondaryText p-[1.2rem]`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetailsContent;
