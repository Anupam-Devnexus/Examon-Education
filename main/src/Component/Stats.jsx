import React from "react";

/**
 * Single stat item component
 */
const StatItem = ({ num, unit, title, isLast }) => (
  <div className="relative flex flex-col items-center text-center px-6 md:px-10">
    {/* Stat Content */}
    <span className="flex items-baseline text-3xl md:text-4xl font-bold text-[var(--primary-color)]">
      {num}
      {unit && (
        <span className="text-[var(--text-color)] text-xl md:text-4xl ml-1">
          {unit}
        </span>
      )}
    </span>
    <span className="text-sm md:text-base font-semibold text-gray-800 mt-1">
      {title}
    </span>

    {/* Vertical Divider (except last item) */}
    {!isLast && (
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-12 border-r-2 border-gray-300 hidden md:block"></div>
    )}
  </div>
);

/**
 * Stats Component
 * @param {Array} data - Array of stats like [{ num: "100", unit: "+", title: "Clients" }]
 */
const Stats = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="text-center py-10 text-gray-500 italic">
        No statistics available.
      </div>
    );
  }

  return (
    <section className="flex flex-wrap justify-center gap-10 py-10 relative">
      {data.map((item, idx) => (
        <StatItem
          key={idx}
          {...item}
          isLast={idx === data.length - 1} // ✅ no line after last
        />
      ))}
    </section>
  );
};

export default Stats;
