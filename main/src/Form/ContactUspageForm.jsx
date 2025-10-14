import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuickConnect from "./QuickConnect";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";

const ContactUspageForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phone, message } = formData;

    if (!firstName || !lastName || !email || !phone || !message) {
      toast.error("Please fill all fields before submitting.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      // 🌐 Send form data to API endpoint
      const response = await axios.post("https://api.example.com/contact", {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        message,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please check your connection.");
    }
  };

  return (
    <div className="flex flex-col rounded-2xl shadow-md overflow-hidden gap-8 p-6 bg-white max-w-6xl mx-auto lg:flex-row  ">
      {/* Toast */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Left - Contact Form */}
      <div className="flex-1 ">
        <h2 className="text-2xl font-semibold text-[#003366] mb-2">
          Send us a message
        </h2>
        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu
          egestas morbi sem vulputate etiam facilisis pellentesque ut quis.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full rounded-full border border-gray-300 focus:border-[#003366] focus:ring-[#003366] px-4 py-2 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full rounded-full border border-gray-300 focus:border-[#003366] focus:ring-[#003366] px-4 py-2 outline-none transition"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full rounded-full border border-gray-300 focus:border-[#003366] focus:ring-[#003366] px-4 py-2 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone No.
              </label>
              <PhoneInput
                country={"in"}
                value={formData.phone}
                placeholder="Enter the Phone Details"
                onChange={(value) =>
                  setFormData({ ...formData, phone: value })
                }
                inputProps={{
                  name: "phone",
                  required: true,
                }}
                containerClass="!rounded-full"
                inputClass="!w-full !rounded-full !border !border-gray-300 !px-4 !py-2 !focus:border-[#003366] !focus:ring-[#003366] !outline-none"
                buttonClass="!rounded-l-full"
                dropdownClass="!rounded-xl"
                
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows={4}
              className="w-full rounded-2xl border border-gray-300 focus:border-[#003366] focus:ring-[#003366] px-4 py-3 outline-none transition resize-none"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#003366] text-white  rounded-full px-8 py-2 font-medium hover:bg-[#002244] transition self-end cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Right - QuickConnect */}
      <div className="flex justify-center lg:justify-end">
        <QuickConnect />
      </div>
    </div>
  );
};

export default ContactUspageForm;