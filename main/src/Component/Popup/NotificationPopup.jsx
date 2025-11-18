import React, { useState, useEffect } from "react";
import { useNotificationStores } from "../../Zustand/GetNotification";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Info,
  Triangle,
} from "lucide-react";

const typeStyles = {
  success: {
    border: "from-cyan-400 to-emerald-500",
    icon: <CheckCircle className="text-cyan-400" size={36} />,
  },
  error: {
    border: "from-rose-500 to-pink-600",
    icon: <AlertCircle className="text-rose-500" size={36} />,
  },
  warning: {
    border: "from-amber-400 to-yellow-500",
    icon: <Triangle className="text-amber-400" size={36} />,
  },
  info: {
    border: "from-indigo-400 to-cyan-500",
    icon: <Info className="text-indigo-400" size={36} />,
  },
};

const NotificationPopup = () => {
  const { notifications, loading, error, fetchNotifications } =
    useNotificationStores();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchNotifications("http://194.238.18.1:3004/api/notification/latest");
    const interval = setInterval(() => {
      fetchNotifications("http://194.238.18.1:3004/api/notification/latest");
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (notifications.length > 0) setCurrentIndex(0);
  }, [notifications]);

  if (loading || error) return null;
  if (!notifications.length || currentIndex === -1) return null;

  const current = notifications[currentIndex];
  const style = typeStyles[current?.type] || typeStyles.info;

  const handleNext = () =>
    currentIndex < notifications.length - 1
      ? setCurrentIndex((prev) => prev + 1)
      : setCurrentIndex(-1);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full max-w-md p-2 rounded-3xl bg-[var(--primary-color)]"
        >
          {/* Neon Glow Border */}
          <div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${style.border} opacity-1 blur-sm`}
          />

          {/* Card Content */}
          <div className="relative bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-xl">
            
            {/* Close */}
            <button
              onClick={handleNext}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition"
            >
              <X size={22} />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4 drop-shadow-md">
              {style.icon}
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-white text-center mb-3 tracking-wide">
              {current?.label || "Notification"}
            </h2>

            {/* Message */}
            <p className="text-white/80 text-center leading-relaxed mb-8">
              {current?.message}
            </p>

            {/* Open Link */}
            {current?.redirectURI && (
              <a
                href={current.redirectURI}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-6 mb-5 
                rounded-xl bg-white/10 text-white/90 
                font-medium backdrop-blur-md 
                border border-white/20 
                hover:bg-white/20 active:scale-95 
                transition duration-200"
              >
                Open Link
                <ExternalLink size={18} />
              </a>
            )}

            {/* Continue */}
            <button
              onClick={handleNext}
              className="w-full py-3 rounded-xl 
              bg-gradient-to-r from-indigo-500 to-cyan-500 
              text-white text-lg font-semibold 
              shadow-lg hover:shadow-xl 
              active:scale-95 transition duration-150"
            >
              Continue
            </button>

            {/* Counter */}
            <div className="flex justify-center mt-6">
              <span className="text-xs px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-white/70 backdrop-blur-sm">
                {currentIndex + 1} / {notifications.length}
              </span>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NotificationPopup;
