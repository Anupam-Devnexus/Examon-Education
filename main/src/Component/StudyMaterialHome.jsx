import React from "react";
import StudyMaterialCard from "./Card/StudyMaterialCard";

const StudyMaterialHome = () => {
  const studyMaterialData = [
    {
      id: 1,
      title: "Notes",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam neque ultrices.",
      link: "/notes",
      image: "./notes.svg",
      bgcolor: "#ECF3FE",
      btncolor: "#254371",
    },
    {
      id: 2,
      title: "PY Question Paper",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam neque ultrices.",
      link: "/pyq",
      image: "./pyq.svg",
      bgcolor: "#FFF8EB",
      btncolor: "#CB9534",
    },
    {
      id: 3,
      title: "Quizzes",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam neque ultrices.",
      link: "/quiz",
      image: "./Quiz.svg",
      bgcolor: "#EAFFF7",
      btncolor: "#248972",
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-20 px-6 md:px-20">
      {/* Section Heading */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-4">
          Study Material & Quiz
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipiscing elit mattis sit
          phasellus mollis sit aliquam sit nullam neque ultrices.
        </p>
        <div className="mt-4 mx-auto w-24 h-1 bg-[var(--primary-color)] rounded-full"></div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {studyMaterialData.map((item, index) => (
          <div
            key={item.id}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <StudyMaterialCard {...item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudyMaterialHome;
