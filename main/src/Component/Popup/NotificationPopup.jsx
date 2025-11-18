import React, { useState, useEffect } from "react";
import { useNotificationStores } from "../../Zustand/GetNotification";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

const typeStyles = {
  success: "from-green-400 to-emerald-500",
  error: "from-red-400 to-red-600",
  warning: "from-yellow-400 to-amber-500",
  info: "from-blue-400 to-indigo-500",
};

const NotificationPopup = () => {
  const { notifications, loading, error, fetchNotifications } =
    useNotificationStores();

  const [currentIndex, setCurrentIndex] = useState(0);

  // FETCH + POLLING
  useEffect(() => {
    fetchNotifications("http://194.238.18.1:3004/api/notification/latest");

    const interval = setInterval(() => {
      fetchNotifications("http://194.238.18.1:3004/api/notification/latest");
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Reset index when new notifications arrive
  useEffect(() => {
    if (notifications.length > 0) setCurrentIndex(0);
  }, [notifications]);

  if (loading || error) return null;
  if (!notifications.length || currentIndex === -1) return null;

  const current = notifications[currentIndex];
  const colorClass = typeStyles[current?.type] || typeStyles.info;

  const handleNext = () => {
    if (currentIndex < notifications.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(-1);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-sm px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.7, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 30 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative p-[1px] rounded-3xl shadow-2xl max-w-sm w-full bg-gradient-to-br"
        >
          {/* Gradient Border */}
          <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${colorClass} opacity-70 blur-xl`}></div>

          {/* Card Content */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-7 shadow-xl overflow-hidden">
            
            {/* Close button */}
            <button
              onClick={handleNext}
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
            >
              <X size={22} />
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {current?.label || "Notification"}
            </h2>

            {/* Message */}
            <p className="text-gray-700 text-base leading-relaxed mb-5">
              {current?.message}
            </p>

            {/* Redirect Link */}
            {current?.redirectURI && (
              <a
                href={current.redirectURI}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[var(--primary-color)] text-white font-medium hover:bg-black transition mb-5"
              >
                Open Link
                <ExternalLink size={18} />
              </a>
            )}

            {/* Ok Button */}
            <button
              onClick={handleNext}
              className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl shadow hover:shadow-lg transition"
            >
              Continue
            </button>

            {/* Counter */}
            <p className="text-xs text-gray-500 mt-4">
              {currentIndex + 1} / {notifications.length}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NotificationPopup;
