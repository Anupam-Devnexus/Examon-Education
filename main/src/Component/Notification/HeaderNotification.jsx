import { useEffect } from "react";
import { useNotificationStore } from "../../Zustand/useNotificationStore";
import { motion } from "framer-motion";

const HeaderNotification = () => {
  const { notifications, initSocket } = useNotificationStore();

  useEffect(() => {
    initSocket();
  }, []);

  const hasData = notifications.length > 0;

  return (
    <div className="w-full bg-[var(--primary-color)] text-white py-2 overflow-hidden shadow-md z-50">
      
      {!hasData && (
        <div className="text-center text-sm py-1">
          🔔 No offers available currently
        </div>
      )}

      {hasData && (
        <motion.div
          className="flex items-center gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {[...notifications, ...notifications].map((item, index) => (
            <div key={index} className="flex items-center gap-3 px-3">

              {item.tags?.map((tag) => (
                <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs">
                  {tag}
                </span>
              ))}

              <span className="font-semibold text-sm md:text-base">
                {item.title}
              </span>

              {item.discount && (
                <span className="text-yellow-300 font-bold text-sm">
                  {item.discount}% OFF
                </span>
              )}

            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default HeaderNotification;
