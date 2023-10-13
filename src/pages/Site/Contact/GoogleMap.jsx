import React from "react";

const GoogleMap = () => {
  return (
    <div className="w-1/2">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.4284905030945!2d49.85137057653474!3d40.37719495804386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d079efb5163%3A0xc20aa51a5f0b5e01!2sCode%20Academy!5e0!3m2!1sen!2saz!4v1697166223646!5m2!1sen!2saz"
        // width="600"
        // height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        className="h-full w-full rounded-3xl border-none"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
