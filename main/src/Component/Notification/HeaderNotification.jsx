import { useNotificationStore } from "../../Zustand/useNotificationStore";
import { motion } from "framer-motion";
import Data from "../../DataStore/Notifications.json"
const HeaderNotification = () => {
  const notifications = useNotificationStore((s) => s.notifications);

  if (notifications.length === 0) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-full py-2 px-4 text-white 
                bg-[var(--primary-color)] overflow-hidden z-50"
      animate={{ x: ["0%", "-100%"] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    >
      <div className="flex gap-8 whitespace-nowrap">
        {notifications.map((n, index) => (
          <span key={index} className="font-medium">
            {n.title}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default HeaderNotification;
