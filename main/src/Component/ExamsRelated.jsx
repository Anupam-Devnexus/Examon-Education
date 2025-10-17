import React from "react";

const ExamsRelated = () => {
  const examsData = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=300&h=300&fit=crop",
      desc: "SSC JE 2025 Exam postponed notification released.",
      date: "May 12, 2025",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=300&fit=crop",
      desc: "UPSC CSE 2025 Prelims application window opens.",
      date: "May 12, 2025",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1610484826967-09c5720778e1?w=300&h=300&fit=crop",
      desc: "GATE 2026 syllabus updated — check new pattern.",
      date: "May 12, 2025",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1610484826967-7cfb9c0e50a3?w=300&h=300&fit=crop",
      desc: "DRDO exam results declared for 2024 intake.",
      date: "May 12, 2025",
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300&h=300&fit=crop",
      desc: "BPSC AE 2025 admit card released today.",
      date: "May 12, 2025",
    },
  ];

  return (
    <section className="border-2 border-gray-100 rounded-2xl p-5 w-full">
      {/* Header */}
    

      {/* Scrollable Cards */}
      <div
        className="flex flex-col gap-5 overflow-y-auto pb-3 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {examsData.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-[280px] md:w-full flex items-center gap-4 border border-gray-100 rounded-xl p-3 hover:bg-[var(--light-bg)] transition-all duration-300 cursor-pointer group"
          >
            <img
              src={item.img}
              alt="exam"
              className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col items-start gap-1">
              <p className="font-semibold text-gray-800 group-hover:text-[var(--primary-color)] line-clamp-2">
                {item.desc}
              </p>
              <span className="text-sm text-gray-500">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExamsRelated;
