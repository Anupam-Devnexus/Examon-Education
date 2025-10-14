import React from 'react';
import { IoIosCall } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { RiMapPin2Fill } from "react-icons/ri";
import { FaYoutube, FaLinkedin, FaInstagramSquare, FaFacebook } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import NewsLetter from "./NewsLetter"

const Footer = () => {

  const Links = [
    { link: "Home", path: "/home" },
    { link: "About", path: "/about" },
    { link: "Contact", path: "/contact" },
    { link: "Services", path: "/services" },
    { link: "Quiz", path: "/quiz" },
    { link: "Study Material", path: "/studymaterial" },
  ];

  const Policies = [
    { link: "Privacy Policy", path: "/privacypolicy" },
    { link: "Terms & Conditions", path: "/terms" },
    { link: "Refund Policy", path: "/refund" },
  ];

  const SocialIcon = ({ Icon, url }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--primary-color)] bg-white p-2 rounded-full hover:bg-gray-200 transition"
    >
      <Icon size={22} />
    </a>
  );

  return (
    <footer className="bg-[var(--primary-color)] flex flex-col gap-2 relative text-[var(--text-color)] px-6 py-10 md:px-16 mt-10 rounded-t-xl shadow-lg">
     <div className="absolute -mt-32">

      <NewsLetter />
     </div>
      {/* TOP SECTION */}
      <div className="grid mt-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-8 border-b border-white/30">
        
        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-white text-2xl mb-2">Contact Details</h2>
          <p>If you have any questions or need help, feel free to contact our team!</p>

          <div className="flex items-center gap-3">
            <IoIosCall size={20} /> <span>+91 83688 86542</span>
          </div>
          <div className="flex items-center gap-3">
            <IoMdMail size={20} /> <span>help@examoneducation.com</span>
          </div>
          <div className="flex items-center gap-3">
            <RiMapPin2Fill size={20} /> <span>Gurgaon, Haryana, India</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <h2 className="text-white font-semibold text-lg mb-2">Quick Links</h2>
          {Links.map((item, i) => (
            <a
              href={item.path}
              key={i}
              className="hover:text-white transition-colors"
            >
              {item.link}
            </a>
          ))}
        </div>

        {/* Policies */}
        <div className="flex flex-col gap-2">
          <h2 className="text-white font-semibold text-lg mb-2">Policies</h2>
          {Policies.map((item, i) => (
            <a
              href={item.path}
              key={i}
              className="hover:text-white transition-colors"
            >
              {item.link}
            </a>
          ))}
        </div>

        {/* Social */}
        <div className="flex flex-col gap-3">
          <h2 className="text-white font-semibold text-lg mb-2">Follow Us</h2>
          <div className="flex gap-3">
            <SocialIcon Icon={FaYoutube} url="#" />
            <SocialIcon Icon={FaLinkedin} url="#" />
            <SocialIcon Icon={FaInstagramSquare} url="#" />
            <SocialIcon Icon={FaFacebook} url="#" />
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-200 mt-6">
        <span className="text-center md:text-left">
          © 2025 <b>Examon Education Pvt. Ltd.</b> | All Rights Reserved
        </span>
        <div className="flex items-center gap-2 mt-3 md:mt-0">
          <a href="/privacypolicy" className="hover:text-white transition">Privacy</a>
          <GoDotFill size={10} />
          <a href="/terms" className="hover:text-white transition">Terms & Conditions</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
