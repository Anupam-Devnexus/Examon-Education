import React from "react";
import Exams from "./ExamsRelated";

const LatestNewsInsights = () => {
  const Textarea = () => {
    return (
      <div className="overflow-y-auto bg-white shadow-sm border border-gray-100 gap-3 p-4 rounded-2xl flex flex-col h-52">
        <span className="text-[var(--primary-color)] font-semibold text-lg">
          Exam Tip of the Week
        </span>
        <p className="text-gray-600 text-sm leading-relaxed">
         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet dolore maiores praesentium! Eum,
          facere ad. Labore, sequi laborum deleniti quisquam delectus quis vitae repudiandae rerum earum natus assumenda quam voluptates tempore quibusdam sed doloremque ea ullam iste vero nulla itaque. Libero expedita iusto quis sunt doloremque ratione praesentium hic porro illo ducimus? Incidunt consectetur debitis deserunt porro, eligendi fugit suscipit soluta facere dolore omnis nobis tempora consequuntur quae
          possimus provident illum nesciunt! Neque quidem eveniet doloremque tempore eaque libero voluptatem!
        </p>
      </div>
    );
  };

  return (
    <section className="w-full bg-[#F9FAFB] py-12 px-6 md:px-14 rounded-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-4xl font-bold text-[var(--primary-color)]">
            Latest News & Insights
          </h2>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Stay updated with the latest trends, government notifications, and
            exam-related insights that help you stay ahead of the curve.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left Column */}
        <div className="flex flex-col gap-5">
          {/* Featured Image */}
          <div className="relative w-full overflow-hidden rounded-2xl shadow-md">
            <img
              src="https://images.pexels.com/photos/33488221/pexels-photo-33488221.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Latest Insights"
              className="w-full h-68 object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-5">
              <h3 className="font-semibold text-lg">
                Featured Insight: Education Meets Innovation
              </h3>
              <p className="text-sm text-gray-200">
                How technology is reshaping competitive exam preparation.
              </p>
            </div>
          </div>

          {/* Text Area */}
          <Textarea />
        </div>

        {/* Right Column */}
        <div className="bg-white rounded-2xl  border border-gray-100 p-6 h-[500px] flex flex-col">
          <span className="text-xl font-semibold text-[var(--primary-color)] mb-3">
            Exam Related
          </span>
          <hr className="border-gray-200 mb-4" />
          <div className="overflow-y-auto flex-grow scrollbar-hide">
            <Exams />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNewsInsights;
