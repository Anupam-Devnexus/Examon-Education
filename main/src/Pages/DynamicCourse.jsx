import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

// Components
import DHero from "../Component/DynamicPage/DHero";
import { StagesOfSSC } from "../Component/StagesOfSSC";
import CoursesYouLike from "../Component/CoursesYouLike";
import MeetMentor from "../Component/DynamicPage/MeetYourMentor";
import QuizandNotes from "../Component/DynamicPage/QuizandNotes";
import Masterclass from "../Component/DynamicPage/Masterclass";
import MasterClassSection from "../Component/MasterClassSection";

// Zustand Store
import { useCourseStore } from "../Zustand/GetAllCourses";

// Loading UI
const LoadingScreen = () => (
  <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
    <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mb-4"></div>
    <p className="text-gray-600 text-sm">Loading course details...</p>
  </div>
);

const DynamicCourse = () => {
  const { courseId } = useParams();
  const { data, loading, error, fetchCourses } = useCourseStore();
  const [course, setCourse] = useState(null);

  // Fetch courses only once (or if not already fetched)
  useEffect(() => {
    if (!data || data.length === 0) {
      fetchCourses();
    }
  }, [fetchCourses, data]);

  // Find the specific course based on courseId (string-safe)
  const foundCourse = useMemo(() => {
    if (!Array.isArray(data)) return null;
    return (
      data.find(
        (item) =>
          String(item.id || item._id) === String(courseId)
      ) || null
    );
  }, [data, courseId]);

  // Update local state when course changes
  useEffect(() => {
    setCourse(foundCourse);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [foundCourse]);

  //  Handle Loading
  if (loading) return <LoadingScreen />;

  //  Handle Error
  if (error) {
    return (
      <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-red-600 mb-2">
          Failed to load course
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-md">
          {error.message || "Please check your connection or try again later."}
        </p>
      </main>
    );
  }

  //  Handle Not Found
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

  //  Main Render
  return (
    <main className="w-full flex flex-col items-center bg-white">
      {/* =====================  Hero Section ===================== */}
      <Suspense fallback={<LoadingScreen />}>
        <section className="w-full">
          <DHero
            title={course.courseDetails}
            image={course.img}
            previousPrice={course.amount}
            currentPrice={course.actualprice}
            percent={course.percent}
            perks={course.perks}
            onEnroll={() =>
              console.log(`Enroll clicked for course ${course.id || course._id}`)
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

      {/* =====================  Extra MasterClass Content ===================== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full"
      >
        <MasterClassSection />
      </motion.div>

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
