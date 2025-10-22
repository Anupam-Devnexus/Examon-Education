import React from "react";
import Stats from "./Stats";

const LeftComp = () => (
  <div className="flex flex-col items-start gap-4 px-6 md:px-16 py-6 md:w-1/2">
    <img src="/double.svg" alt="quote" className="w-8 h-8 mb-2" />
    <p className="text-gray-800 text-md leading-relaxed">
      We help serious aspirants turn disciplined preparation into consistent results.
    </p>
  </div>
);

const RightComp = ({ data }) => (
  <div className="flex flex-col items-start justify-center gap-6 px-6 md:px-16 py-6 ">
    <p className="text-black text-sm md:text-base leading-relaxed">
      We offer bilingual learning in Hindi and English, accessible on app and web platforms,
      with transparent, affordable plans. Start your journey with <strong>Examon Education</strong> today!
    </p>

    {/* Dynamic Stats Section */}
    <Stats data={data} />
  </div>
);

const AboutNumber = () => {
  const data = [
    { num: "5", unit: "M+", title: "Students" },
    { num: "50", unit: "+", title: "Courses" },
    { num: "20", unit: "%", title: "Instructors" },
    { num: "10", unit: "K+", title: "Alumni" },
  ];

  return (
    <section className="bg-[var(--tertiary-color)] min-h-[60vh] flex flex-col md:flex-row justify-between">
      <LeftComp />
      <RightComp data={data} />
    </section>
  );
};

export default AboutNumber;
