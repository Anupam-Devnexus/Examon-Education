import React, { useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { FaArrowDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Masterclass = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const Data = [
    {
      id: 1,
      title: "Deep Concept Clarity",
      desc: "Understand every concept from Civil, Electrical, or Mechanical Engineering with simplified explanations.",
    },
    {
      id: 2,
      title: "Exam-Focused Approach",
      desc: "Focused coverage of important topics, helping you target high-scoring areas effectively.",
    },
    {
      id: 3,
      title: "Practical Application",
      desc: "Relate theoretical concepts with real-world engineering problems through practical demonstrations.",
    },
    {
      id: 4,
      title: "Doubt Solving",
      desc: "Get your queries answered live during the session to ensure complete conceptual clarity.",
    },
    {
      id: 5,
      title: "Smart Strategy",
      desc: "Learn exam techniques, time management, and smart methods to boost your SSC JE score.",
    },
  ];

  const Card = ({ id, title, desc }) => {
    const isActive = activeIndex === id;

    return (
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        className={`flex flex-col justify-between h-56 rounded-2xl p-5 border shadow-md cursor-pointer
          ${
            isActive
              ? "bg-[var(--primary-color)] text-white border-transparent z-20"
              : "bg-[#E9F6FF] text-[#333] border-gray-200 sm:hover:bg-[var(--primary-color)] sm:hover:text-white"
          }`}
        style={{
          flex: isActive ? 1.5 : 1,
          minWidth: "180px",
          maxWidth: "100%",
          transition: "flex 0.4s ease",
        }}
        onClick={() => {
          if (window.innerWidth < 640) setActiveIndex(isActive ? null : id);
        }}
        onMouseEnter={() => {
          if (window.innerWidth >= 640) setActiveIndex(id);
        }}
        onMouseLeave={() => {
          if (window.innerWidth >= 640) setActiveIndex(null);
        }}
      >
        {/* Title + Arrow */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">{title}</span>
          <motion.span
            animate={{ rotate: isActive ? 0 : 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white text-[var(--primary-color)] p-2 rounded-full"
          >
            {isActive ? <FaArrowDown /> : <GrFormNextLink />}
          </motion.span>
        </div>

        {/* Description (AnimatedPresence for smooth mount/unmount) */}
        <AnimatePresence>
          {isActive && (
            <motion.p
              key={id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-sm font-light leading-relaxed mt-3"
            >
              {desc}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section className="flex flex-col items-center justify-center py-10 px-4 sm:px-6 md:px-12 bg-white w-full overflow-hidden">
      {/* Header */}
      <div className="w-full max-w-full mb-8 text-center md:text-left">
        <p className="text-sm md:text-base text-[var(--text-color)]">
          What You’ll Learn in this
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary-color)]">
          SSC JE Masterclass
        </h2>
      </div>

      {/* Flex container with motion layout for fluid reflow */}
      <motion.div
        layout
        className="flex flex-col sm:flex-row w-full gap-2 max-w-full transition-all duration-500"
      >
        {Data.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </motion.div>
    </section>
  );
};

export default Masterclass;
