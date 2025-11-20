import React from "react";
import { motion } from "framer-motion";
import Data from "../../DataStore/Notifications.json";

const HeaderNotification = () => {
  // Duplicate items so the banner loops smoothly
  const notifications = [...Data, ...Data];

  return (
    <div className="left-0 w-full bg-[var(--primary-color)] text-white py-2 overflow-hidden z-50 shadow-md">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: ["0%", "-100%"]
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20 // speed — increase for faster scroll
        }}
      >
        {notifications.map((item, index) => (
          <span
            key={index}
            className="mx-6 text-sm font-medium flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-white rounded-full"></span>
            {item.title || item.message}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default HeaderNotification;
