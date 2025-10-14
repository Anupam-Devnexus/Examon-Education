import React from "react";
import Hero from "../Component/Hero";
import ContactForm from "../Form/ContactUspageForm";

const ContactUs = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative z-0">
        <Hero
          Title="Contact Us"
          bg="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          desc="We would love to hear from you!"
          alt="Contact background image"
        />
      </section>

      {/* Contact Form Section */}
      <section className="relative z-[10] -mt-60 px-4 md:px-8 lg:px-16 py-25 flex justify-center">
        <div className="w-full max-w-screen-xl bg-white rounded-xl shadow-lg p-6 md:p-10">
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
