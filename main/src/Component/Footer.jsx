import React from "react";
import { IoIosCall, IoMdMail } from "react-icons/io";
import { RiMapPin2Fill } from "react-icons/ri";
import {
  FaYoutube,
  FaLinkedin,
  FaInstagramSquare,
  FaFacebook,
} from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import NewsLetter from "./NewsLetter";

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
      className="text-[var(--primary-color)] bg-white p-2 rounded-full hover:text-[var(--primary-color)] transition"
      aria-label={`Visit our ${Icon.name} page`}
    >
      <Icon size={22} />
    </a>
  );

  return (

    <footer className="bg-[var(--primary-color)] text-[var(--text-color)] px-6 py-16 md:px-20 rounded-t-xl shadow-lg">
      {/* Newsletter */}
      <div className="-mt-33">
        <NewsLetter />
      </div>

      {/* Top Grid */}
      <div className="grid grid-cols-1 mt-12 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/30">
        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-white text-2xl font-bold">Contact Details</h2>
          <p className="text-sm">
            If you have any questions or need help, feel free to contact our team!
          </p>
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

        {/* Quick Links */}
        <div className="space-y-2">
          <h2 className="text-white text-lg font-semibold">Quick Links</h2>
          {Links.map((item, i) => (
            <a
              key={i}
              href={item.path}
              className="hover:text-white transition-colors block text-sm"
            >
              {item.link}
            </a>
          ))}
        </div>

        {/* Policies */}
        <div className="space-y-2">
          <h2 className="text-white text-lg font-semibold">Policies</h2>
          {Policies.map((item, i) => (
            <a
              key={i}
              href={item.path}
              className="hover:text-white transition-colors block text-sm"
            >
              {item.link}
            </a>
          ))}
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <h2 className="text-white text-lg font-semibold">Follow Us</h2>
          <div className="flex gap-3">
            <SocialIcon Icon={FaYoutube} url="#" />
            <SocialIcon Icon={FaLinkedin} url="#" />
            <SocialIcon Icon={FaInstagramSquare} url="#" />
            <SocialIcon Icon={FaFacebook} url="#" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-200 mt-8">
        <span className="text-center md:text-left">
          © 2025 <strong>Examon Education Pvt. Ltd.</strong> | All Rights Reserved
        </span>
        <div className="flex items-center gap-2 mt-3 md:mt-0">
          <a href="/privacypolicy" className="hover:text-white transition">
            Privacy
          </a>
          <GoDotFill size={10} />
          <a href="/terms" className="hover:text-white transition">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
