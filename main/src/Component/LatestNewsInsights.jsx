import React, { useState } from "react";

const LatestNewsInsights = () => {
  const allItems = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=400&fit=crop",
      title: "SSC JE 2025 Exam postponed notification released.",
      desc: "The SSC JE 2025 exam has been postponed due to administrative reasons. Candidates are advised to check the official website for revised dates.The SSC JE 2025 exam has been postponed due to administrative reasons. Candidates are advised to check the official website for revised dates.The SSC JE 2025 exam has been postponed due to administrative reasons. Candidates are advised to check the official website for revised dates.The SSC JE 2025 exam has been postponed due to administrative reasons. Candidates are advised to check the official website for revised dates.The SSC JE 2025 exam has been postponed due to administrative reasons. Candidates are advised to check the official website for revised dates.The SSC JE 2025 exam has been postponed due to administrative reasons. Candidates are advised to check the official website for revised dates.The SSC JE 2025 exam has been postponed due to administrative reasons. Candidates are advised to check the official website for revised dates.The SSC JE 2025 exam has been postponed due to administrative reasons. Candidates are advised to check the official website for revised dates.The SSC JE 2025 exam has been postponed due to administrative reasons. Candidates are advised to check the official website for revised dates.The SSC JE 2025 exam has been postponed due to administrative reasons. Candidates are advised to check the official website for revised dates.",
      date: "May 12, 2025",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=400&fit=crop",
      title: "UPSC CSE 2025 Prelims application window opens.",
      desc: "UPSC has opened the application window for CSE 2025 Prelims. Eligible candidates can apply online until June 15.",
      date: "May 12, 2025",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1581090700227-1e7b1c7b6a6b?w=800&h=400&fit=crop",
      title: "National Merit Scholarship 2025 applications now open.",
      desc: "Students scoring above 90% in board exams can now apply for the National Merit Scholarship 2025.",
      date: "May 10, 2025",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800&h=400&fit=crop",
      title: "AICTE announces new fellowship for engineering students.",
      desc: "AICTE has launched a new fellowship program to support innovation and research among engineering students.",
      date: "May 11, 2025",
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1610484826967-09c5720778e1?w=800&h=400&fit=crop",
      title: "CBSE Class 12 results expected by May end.",
      desc: "CBSE is expected to release Class 12 results by the end of May. Students can check results on the official portal.",
      date: "May 09, 2025",
    },
    {
      id: 6,
      img: "https://images.unsplash.com/photo-1610484826967-7cfb9c0e50a3?w=800&h=400&fit=crop",
      title: "NEET UG 2025 admit cards released.",
      desc: "NEET UG 2025 admit cards are now available for download. Candidates must carry a printed copy to the exam center.",
      date: "May 08, 2025",
    },
     {
      id: 7,
      img: "https://images.unsplash.com/photo-1610484826967-7cfb9c0e50a3?w=800&h=400&fit=crop",
      title: "NEET UG 2025 admit cards released.",
      desc: "NEET UG 2025 admit cards are now available for download. Candidates must carry a printed copy to the exam center.",
      date: "May 08, 2025",
    },
     {
      id: 8,
      img: "https://images.unsplash.com/photo-1610484826967-7cfb9c0e50a3?w=800&h=400&fit=crop",
      title: "NEET UG 2025 admit cards released.",
      desc: "NEET UG 2025 admit cards are now available for download. Candidates must carry a printed copy to the exam center.",
      date: "May 08, 2025",
    },
     {
      id: 9,
      img: "https://images.unsplash.com/photo-1610484826967-7cfb9c0e50a3?w=800&h=400&fit=crop",
      title: "NEET UG 2025 admit cards released.",
      desc: "NEET UG 2025 admit cards are now available for download. Candidates must carry a printed copy to the exam center.",
      date: "May 08, 2025",
    }
  ];

  const [selectedItem, setSelectedItem] = useState(allItems[0]);

  return (
    <section className="w-full bg-[#F9FAFB] py-12 px-4 sm:px-6 md:px-14 rounded-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-bold text-[var(--primary-color)]">
              Latest News & Insights
            </h2>
            <p className="text-gray-600 max-w-4xl leading-relaxed text-base">
              Stay updated with the latest trends, government notifications, and exam-related insights that help you stay ahead of the curve.
            </p>
          </div>

          {/* Dynamic Featured Image */}
          <div className="relative w-full h-40 aspect-video overflow-hidden rounded-2xl shadow-md">
            <img
              src={selectedItem.img}
              alt="Featured"
              className="w-full  object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-5">
              <h3 className="font-semibold text-lg">{selectedItem.title}</h3>
              <p className="text-sm text-gray-200">{selectedItem.desc.split('').slice(0,60).join('')}...</p>
            </div>
          </div>

          {/* Dynamic Tip Section */}
          <div className="bg-white shadow-sm h-72 overflow-scroll border border-gray-100 p-4 rounded-2xl flex flex-col gap-3">
            <span className="text-[var(--primary-color)] font-semibold text-lg">
              {selectedItem.title}
            </span>
            <p className="text-gray-600 text-sm leading-relaxed">
              {selectedItem.desc}
            </p>
            <span className="text-sm text-gray-500">{selectedItem.date}</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-4 max-h-[600px] overflow-hidden">
          <span className="text-xl font-semibold text-[var(--primary-color)]">
            Exams Related
          </span>
          <hr className="border-gray-200" />
          <div className="overflow-y-auto flex-grow scrollbar-hide pr-1">
            <section className="flex flex-col gap-5">
              {allItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="flex items-center gap-4 border border-gray-100 rounded-xl p-3 hover:bg-[var(--tertiary-color)] transition-all duration-300 cursor-pointer group"
                >
                  <img
                    src={item.img}
                    alt="item"
                    className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex flex-col items-start gap-1">
                    <p className="font-semibold text-gray-800 group-hover:text-[var(--primary-color)] line-clamp-2">
                      {item.title}
                    </p>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNewsInsights;
