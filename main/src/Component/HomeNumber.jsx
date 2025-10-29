import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer"; // ✅ Correct import

const HomeNumber = () => {
  const stats = [
    { num: 3, unit: "M", text: "Active Users" },
    { num: 99, unit: "%", text: "Customer Satisfaction" },
    { num: 50, unit: "+", text: "Courses" },
    { num: 240, unit: "%", text: "Passing Rate" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  //  Count-up animation when visible
  const CountUp = ({ target }) => {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({ triggerOnce: true });

    useEffect(() => {
      if (inView) {
        let start = 0;
        const duration = 1500; // total animation time in ms
        const stepTime = 20; // ms between increments
        const increment = target / (duration / stepTime);

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            clearInterval(timer);
            start = target;
          }
          setCount(Math.floor(start));
        }, stepTime);

        return () => clearInterval(timer);
      }
    }, [inView, target]);

    return (
      <span ref={ref} className="text-[var(--primary-color)]">
        {count}
      </span>
    );
  };

  const NumbCompo = ({ num, unit, text, isLast }) => (
    <motion.div
      variants={itemVariants}
      className="flex items-center justify-center relative"
    >
      <div className="flex flex-col items-center text-center p-4 ">
        <div className="flex items-center justify-center gap-1 text-3xl sm:text-4xl font-extrabold">
          <CountUp target={num} />
          {unit}
        </div>
        <span className="mt-2 text-sm sm:text-base text-[var(--primary-color)] font-semibold">
          {text}
        </span>
      </div>

      {/* Divider line (hidden on mobile) */}
      {!isLast && (
        <div className="hidden md:block h-12 w-[2px] bg-[var(--primary-color)] mx-4"></div>
      )}
    </motion.div>
  );

  return (
    <motion.div
      className="w-full flex flex-col items-center justify-center py-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 max-w-5xl w-full justify-items-center"
        variants={containerVariants}
      >
        {stats.map((item, index) => (
          <NumbCompo
            key={index}
            {...item}
            isLast={index === stats.length - 1}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HomeNumber;
