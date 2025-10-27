import React, { useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { FaArrowDown } from "react-icons/fa";

const Masterclass = () => {
  const [activeIndex, setActiveIndex] = useState(1);

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
      <div
        className={`
          group relative flex flex-col justify-between h-48 rounded-2xl shadow-md p-5 cursor-pointer
          transition-all duration-500 ease-in-out
          ${
            isActive
              ? "bg-[var(--primary-color)] text-white"
              : "bg-[var(--secondary-color)] text-[#333]"
          }
          w-full sm:w-[95%] hover:sm:w-[105%]
        `}
        onMouseEnter={() => setActiveIndex(id)}
        onMouseLeave={() => setActiveIndex(null)}
        onClick={() => setActiveIndex(isActive ? null : id)}
      >
        {/* Title + Arrow */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">{title}</span>
          <span
            className={`bg-white text-[var(--primary-color)] p-2 rounded-full transition-transform duration-500 
            ${isActive ? "rotate-0" : "rotate-0"}`}
          >
            {isActive ? <FaArrowDown /> : <GrFormNextLink />}
          </span>
        </div>

        {/* Description */}
        <p
          className={`text-sm font-light leading-relaxed transition-all duration-500 ease-in-out 
          ${
            isActive
              ? "opacity-100 max-h-40"
              : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          {desc}
        </p>
      </div>
    );
  };

  return (
    <section className="flex flex-col items-start justify-start py-6 px-6 w-full bg-white">
      {/* Header */}
      <div className="flex flex-col items-start gap-2 mb-8">
        <span className="text-base text-[var(--text-color)]">
          What You’ll Learn in this
        </span>
        <span className="font-bold text-3xl text-[var(--primary-color)]">
          SSC JE Masterclass
        </span>
      </div>

      {/* Responsive Grid */}
      <div
        className="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 
        gap-4    w-full transition-all duration-500"
      >
        {Data.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Masterclass;
