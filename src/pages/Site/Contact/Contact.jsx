import React from "react";
import Title from "../../../components/ui/Title/Title";
import GoogleMap from "./GoogleMap";
import ContactForm from "../../../components/form/ContactForm/ContactForm";
import OutBookStoresList from "./OutBookStoresList";

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

      <div className="container my-16 w-full border-[1px] border-solid text-secondaryText"></div>

      <OutBookStoresList />
    </section>
  );
};

export default Contact;
