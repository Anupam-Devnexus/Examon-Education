import React from "react";
import Exams from "./ExamsRelated";

const LatestNewsInsights = () => {
  const Textarea = () => (
    <div className="bg-white shadow-sm border border-gray-100 p-4 rounded-2xl h-68 overflow-y-auto flex flex-col gap-3">
      <span className="text-[var(--primary-color)] font-semibold text-lg">
        Exam Tip of the Week
      </span>
      <p className="text-gray-600 text-sm leading-relaxed">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis adipisci facilis quidem quasi quos voluptates, qui laboriosam hic ipsa necessitatibus illum, quibusdam, labore nisi exercitationem porro vitae tempora praesentium voluptas quas! Molestias corrupti, voluptates consectetur, adipisci molestiae quibusdam eum, nesciunt similique earum laudantium ratione hic labore nostrum at soluta ut magnam obcaecati quam. Laudantium porro in fuga doloremque ipsum maiores assumenda hic magni, quam, perspiciatis commodi officiis deleniti exercitationem illo, cum quidem harum praesentium consectetur? Delectus, iusto! Dignissimos, autem veritatis magni ipsum quis provident atque perspiciatis, sunt nulla nihil incidunt!
      </p>
    </div>
  );

  return (
    <section className="w-full bg-[#F9FAFB] py-12 px-6 md:px-14 rounded-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-bold text-[var(--primary-color)]">
              Latest News & Insights
            </h2>
            <p className="text-gray-600 max-w-4xl leading-relaxed">
              Stay updated with the latest trends, government notifications, and exam-related insights that help you stay ahead of the curve.
            </p>
          </div>

          {/* Featured Image */}
          <div className="relative w-full overflow-hidden rounded-2xl shadow-md">
            <img
              src="https://images.pexels.com/photos/33488221/pexels-photo-33488221.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Latest Insights"
              className="w-full h-42 object-cover hover:scale-105 transition-transform duration-500"
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

          {/* Tip Section */}
          <Textarea />
        </div>

        {/* Right Column */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-4 max-h-[600px] overflow-hidden">
          <span className="text-xl font-semibold text-[var(--primary-color)]">
            Exam Related
          </span>
          <hr className="border-gray-200" />
          <div className="overflow-y-auto flex-grow scrollbar-hide pr-1">
            <Exams />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNewsInsights;
