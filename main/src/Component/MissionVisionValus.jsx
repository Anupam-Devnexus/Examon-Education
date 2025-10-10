import React from "react";
import Card from "./Card/Card";

const MissionVisionValues = () => {
  const cards = [
    {
      title: "VISION",
      bgImage: "https://images.pexels.com/photos/217380/pexels-photo-217380.jpeg",
      icon: "https://images.hdqwalls.com/wallpapers/red-and-gold-legend-iron-man-80.jpg",
      description:
        "We envision a world where learning is accessible, innovative, and empowers every student to achieve their true potential.",
      accentColor: "#EB3F57",
    },
    {
      title: "MISSION",
      bgImage: "https://images.pexels.com/photos/217380/pexels-photo-217380.jpeg",
      icon: "https://images.hdqwalls.com/wallpapers/red-and-gold-legend-iron-man-80.jpg",
      description:
        "Our mission is to empower learners through dynamic, bilingual, and affordable education — accessible anytime, anywhere.",
      accentColor: "#2EA7D6",
    },
    {
      title: "VALUES",
      bgImage: "https://images.pexels.com/photos/217380/pexels-photo-217380.jpeg",
      icon: "https://images.hdqwalls.com/wallpapers/red-and-gold-legend-iron-man-80.jpg",
      description:
        "Integrity, inclusivity, and innovation drive everything we do — ensuring a culture of continuous growth and impact.",
      accentColor: "#EC8A2C",
    },
  ];

  return (
    <section className="min-w-full m py-16 px-6 md:px-8">
      {/* Header */}
      <div className="text-left mb-12">
        <h2 className="text-lg md:text-xl text-gray-700">
          Examon Education’s
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary-color)]">
          Mission, Vision & Values
        </h1>
        <div className="w-16 h-1 bg-[var(--primary-color)]  mt-3 rounded-full"></div>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-10">
        {cards.map((item, idx) => (
          <Card key={idx} {...item} />
        ))}
      </div>
    </section>
  );
};

export default MissionVisionValues;
