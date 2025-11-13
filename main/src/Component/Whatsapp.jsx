import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Whatsapp = () => {
  // Replace with your actual WhatsApp number (with country code, no + or spaces)
  const phoneNumber = "+91 86020 10101"; 
  const defaultMessage = encodeURIComponent("Hello! I'm interested in your services."); 

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;
    window.open(url, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 cursor-pointer transition-transform transform hover:scale-110"
    >
      <div className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 flex items-center justify-center">
        <FaWhatsapp size={28} />
      </div>
    </div>
  );
};

export default Whatsapp;
