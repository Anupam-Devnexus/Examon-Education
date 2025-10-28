import React from "react";
import ContactForm from "../Form/ContactForm";
import { MdEmail } from "react-icons/md";
import { IoCallSharp } from "react-icons/io5";

const ContactSection = () => {
  return (
    <section className="w-full mb-12 px-6 md:px-8">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* 🔹 Left Content */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <p className="text-[var(--text-color)] text-sm tracking-widest uppercase mb-2">
              We're Here to Help You
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-color)] leading-snug">
              Discuss Your Course Related Queries
            </h2>
            <p className="text-gray-600 mt-3 text-base">
              Are you looking for top-quality courses and batches? 
              Reach out to us and our team will guide you through your journey.
            </p>
          </div>

          {/* 🔸 Contact Info */}
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-center gap-4 rounded-xl p-4 ">
              <div className="bg-[var(--secondary-color)] text-white p-4 rounded-full text-2xl flex items-center justify-center">
                <MdEmail />
              </div>
              <div className="flex flex-col">
                <span className="text-[var(--text-color)] text-sm font-medium">Email</span>
                <span className="text-[var(--secondary-color)] font-semibold text-lg">
                  help@gmail.com
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4  p-4 ">
              <div className="bg-[var(--secondary-color)] text-white p-4 rounded-full text-2xl flex items-center justify-center">
                <IoCallSharp />
              </div>
              <div className="flex flex-col">
                <span className="text-[var(--text-color)] text-sm font-medium">
                  Phone Number
                </span>
                <span className="text-[var(--secondary-color)] font-semibold text-lg">
                  9852981212
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Right Form */}
        <div className="">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
