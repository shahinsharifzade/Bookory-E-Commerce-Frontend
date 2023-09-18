import React from "react";

const SocialLink = ({ href, icon }) => {
  return (
    <a href={href} className="hover:text-primaryText" target="_blank">
      {icon}
    </a>
  );
};

export default SocialLink;
