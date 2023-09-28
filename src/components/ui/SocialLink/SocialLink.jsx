import React from "react";

const SocialLink = ({ href, icon, classes }) => {
  return (
    <a
      href={href}
      className={`hover:text-primaryText ${classes}`}
      target="_blank"
    >
      {icon}
    </a>
  );
};

export default SocialLink;
