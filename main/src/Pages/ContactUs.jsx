import React from "react";
import { motion } from "framer-motion";
import Hero from "../Component/Hero";
import ContactForm from "../Form/ContactUspageForm";

const ContactUs = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative z-0"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Hero
          Title="Contact Us"
          bg="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          desc="We would love to hear from you!"
          alt="Contact background image"
        />
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        className="relative z-[10] -mt-60 px-4 md:px-8 lg:px-16 py-25 flex justify-center"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
      >
        <motion.div
          className="w-full max-w-screen-xl bg-white rounded-xl shadow-lg p-6 md:p-10"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        >
          <ContactForm />
        </motion.div>
      </motion.section>
    </div>
  );
};

export default ContactUs;
