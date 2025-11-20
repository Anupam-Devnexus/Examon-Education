import { useNotificationStore } from "../../Zustand/useNotificationStore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Data from "../../DataStore/Notifications.json";

const HeaderNotification = () => {
  const notifications = useNotificationStore((s) => s.notifications);

  // If no backend notifications, use mock JSON
  const finalNotifications =
    notifications && notifications.length > 0 ? notifications : Data;

  if (!finalNotifications || finalNotifications.length === 0) return null;

  // Duplicate list for smooth infinite scroll
  const marqueeItems = [...finalNotifications, ...finalNotifications];

  return (
    <div className=" left-0 w-full z-[100] bg-[var(--primary-color)] text-white py-2 overflow-hidden shadow-md">
      <motion.div
        className="flex items-center gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {marqueeItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3 px-3">

            {/* Tags */}
            {item.tags?.map((tag, i) => (
              <span
                key={i}
                className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}

            {/* Title */}
            <span className="font-semibold text-sm md:text-base">
              {item.title}
            </span>

            {/* Discount */}
            {item.discount && (
              <span className="text-yellow-300 font-bold text-sm">
                {item.discount}% OFF
              </span>
            )}

            {/* CTA */}
            {item.cta?.url && (
              <Link
                to={item.cta.url}
                className="ml-2 bg-black/50 text-[var(--primary-color)] text-xs md:text-sm px-3 py-1 rounded-full font-semibold hover:bg-gray-200 transition"
              >
                {item.cta.label}
              </Link>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeaderNotification;
