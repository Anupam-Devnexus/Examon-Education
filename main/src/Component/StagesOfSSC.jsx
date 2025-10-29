import React, { useState, useEffect } from "react";
import Data from "../DataStore/Stages.json";

export const StagesOfSSC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    // Animate through the list only once
    if (activeIndex < Data.length - 1) {
      const timer = setTimeout(() => {
        setActiveIndex((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  // Animate line progress based on current stage
  useEffect(() => {
    const newHeight = (activeIndex / (Data.length - 1)) * 100;
    setLineHeight(newHeight);
  }, [activeIndex]);

  return (
    <div className="w-full flex flex-col items-center justify-center py-10 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-[#4D4D4D] mb-10 text-center">
        Stages of the SSC JE Masterclass
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-8 px-4">
        {/* Left Section - List with connected line */}
        <div className="relative flex flex-col gap-6 w-full md:w-2/3">

          {/* Vertical connecting line */}
          <div className="absolute left-[6px] top-2 bottom-2 w-[2px] bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-[var(--primary-color)] transition-all duration-700 ease-in-out"
              style={{ height: `${lineHeight}%` }}
            ></div>
          </div>

          {Data.map((item, index) => (
            <div key={item.id} className="flex items-center gap-10 relative z-10">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  activeIndex >= index
                    ? "bg-[var(--primary-color)]"
                    : "bg-[#3498DB]"
                }`}
              ></div>
              <p
                className={`cursor-pointer font-semibold transition-all duration-500 ${
                  activeIndex === index
                    ? "text-[var(--primary-color)] text-lg"
                    : activeIndex > index
                    ? "text-gray-700"
                    : "text-[#3498DB]"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* Right Section - Image + Description */}
        <div
          className="relative flex flex-col items-center md:w-1/2 bg-contain bg-no-repeat bg-center"
          style={{
            background: 'url("/stagesbg.svg")',
          }}
        >
          <div
            key={Data[activeIndex].id}
            className="transition-all duration-800 ease-in-out transform opacity-100 animate-fadeIn"
          >
            <img
              src={Data[activeIndex].image}
              alt={Data[activeIndex].title}
              className="w-[220px] rounded-xl object-contain mx-auto"
            />
            <p className="text-center text-[#6D6D6D] mt-4 text-sm max-w-lg">
              {Data[activeIndex].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
