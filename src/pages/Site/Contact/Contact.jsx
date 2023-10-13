import React from "react";
import Title from "../../../components/ui/Title/Title";
import GoogleMap from "./GoogleMap";
import ContactForm from "../../../components/form/ContactForm/ContactForm";

const Contact = () => {
  return (
    <section>
      <Title
        title={"Contact"}
        mainNav={"HOME"}
        secondaryNav={"Contact"}
        secondaryNavDisplay={"hidden"}
      />

      <div className="container mt-24 flex pb-16">
        <GoogleMap />
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
