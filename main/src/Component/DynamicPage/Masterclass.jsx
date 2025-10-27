import React, { useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { FaArrowDown } from "react-icons/fa";

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

    const handleToggle = () => {
      setActiveIndex(isActive ? null : id);
    };

    return (
      <div
        className={`relative flex flex-col justify-around h-48 rounded-2xl shadow-md p-5 cursor-pointer transition-all duration-500 ease-in-out
          ${isActive ? "bg-[var(--primary-color)] text-white" : "bg-[var(--secondary-color)] text-[#333]"}
          hover:scale-[1.02]`}
        onClick={handleToggle}
        onMouseEnter={() => setActiveIndex(id)}
        onMouseLeave={() => setActiveIndex(null)}
      >
        {/* Title + Arrow */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">{title}</span>
          <span
            className={`bg-white text-[var(--primary-color)] p-2 rounded-full transition-transform duration-500
              ${isActive ? "rotate-360" : "rotate-0"}`}
          >
            {isActive ? <FaArrowDown /> : <GrFormNextLink />}
          </span>
        </div>

        {/* Description with animation */}
        <p
          className={`text-sm leading-relaxed mt-3 transition-all duration-500 ease-in-out 
            ${isActive ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"}`}
        >
          {desc}
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-start justify-start py-6 px-4 w-full">
      {/* Header */}
      <div className="flex flex-col items-start gap-2 mb-6">
        <span className="text-base text-[var(--text-color)]">
          What You’ll Learn in this
        </span>
        <span className="font-bold text-2xl text-[var(--primary-color)]">
          SSC JE Masterclass
        </span>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
        {Data.map((item) => (
          <Card key={item.id} id={item.id} title={item.title} desc={item.desc} />
        ))}
      </div>
    </div>
  );
};

export default Masterclass;
