import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useParams } from "react-router-dom";
import Data from "../DataStore/Courses.json";
import DHero from "../Component/DynamicPage/DHero";
import { StagesOfSSC } from "../Component/StagesOfSSC";
import CoursesYouLike from "../Component/CoursesYouLike";
import MeetMentor from "../Component/DynamicPage/MeetYourMentor";
import QuizandNotes from "../Component/DynamicPage/QuizandNotes";
import Masterclass from "../Component/DynamicPage/Masterclass";
import MasterClassCard from "../Component/Card/MasterClassCard";

// Simple Loading Component
const LoadingScreen = () => (
  <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
    <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mb-4"></div>
    <p className="text-gray-600 text-sm">Loading course details...</p>
  </div>
);

const DynamicCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  // Scroll to top when course changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Find course only once using useMemo
  const foundCourse = useMemo(() => {
    return Data.find((item) => item.id === Number(id)) || null;
  }, [id]);

  // Set course data once found
  useEffect(() => {
    setCourse(foundCourse);
  }, [foundCourse]);


  const MasterClassData = [
    {
      id: 1,
      desc1:
        "This course helps you bridge the gap between theory and practical exam application.",
      desc2: "Diploma and B.Tech Students (Civil, Mechanical, Electrical)",
      bgcolor: "#BDAAE4", // deep navy blue
    },
    {
      id: 2,
      desc1:
        "You’ll get topic-wise quizzes, structured study notes, and mock tests to assess your progress and improve speed and accuracy with every session.",
      desc2: "Aspirants Targeting SSC JE 2025 / 2026",
      bgcolor: "#81B9C4", // rich indigo tone
    },
    {
      id: 3,
      desc1:
        "This course includes revision sheets, mock practice sessions, and doubt-solving discussions, helping you revise smarter, not harder before the exam.",
      desc2: "Full-Course Revision and Smart Practice",
      bgcolor: "#EC8A2C", // vibrant violet
    },
    {
      id: 4,
      desc1:
        "The flexible video lectures, recorded sessions, and quick revision materials allow you to prepare at your own pace — without disturbing your job schedule.",
      desc2: "Working Professionals Seeking Government Jobs",
      bgcolor: "#070D2C", // dark blue-cyan tone
    },
  ];



  // Handle missing course gracefully
  if (!course) {
    return (
      <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
          Course Not Found
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          The course you’re looking for doesn’t exist or might have been removed.
        </p>
      </main>
    );
  }

  return (
    <main className="w-full flex flex-col items-center bg-white">
      {/* =====================  Hero Section ===================== */}
      <Suspense fallback={<LoadingScreen />}>
        <section className="w-full">
          <DHero
            title={course.courseDetails}
            image={course.img}
            previousPrice={course.previousprice}
            currentPrice={course.actualprice}
            percent={course.percent}
            perks={course.perks}
            onEnroll={() =>
              console.log(`Enroll clicked for course ${course.id}`)
            }
          />
        </section>
      </Suspense>

      {/* =====================  Course Stages ===================== */}
      <section className="w-full">
        <StagesOfSSC />
      </section>

      {/* =====================  Masterclass Section ===================== */}
      <section className="w-full">
        <Masterclass />
      </section>

      {/* =====================  Quiz & Notes ===================== */}
      <section className="w-full">
        <QuizandNotes />
      </section>

      <section>
        <div className="grid mt-4 grid-cols-1 place-items-between px-6 min-w-full md:grid-cols-2 gap-4 lg:grid-cols-4">

          {MasterClassData.length > 0 ? MasterClassData.map((e, index) => {
            return (

              <MasterClassCard
                key={index}
                desc1={e.desc1}
                desc2={e.desc2}
                bgcolor={e.bgcolor}
              />

            )
          }) : "no data"}
        </div >
      </section>

      {/* =====================  Meet Your Mentor ===================== */}
      <section className="w-full mt-6">
        <MeetMentor />
      </section>

      {/* =====================  Related Courses ===================== */}
      <section className="w-full py-8 mb-18 bg-[#F9FAFB]">
        <CoursesYouLike title={false} />
      </section>
    </main>
  );
};

export default DynamicCourse;
