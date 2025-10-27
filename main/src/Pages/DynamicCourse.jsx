import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MeetMentor from "../Component/DynamicPage/MeetYourMentor";
import DHero from "../Component/DynamicPage/DHero";
import CoursesYouLike from "../Component/CoursesYouLike";
import { StagesOfSSC } from "../Component/StagesOfSSC";
import QuizandNotes from "../Component/DynamicPage/QuizandNotes";
import Masterclass from "../Component/DynamicPage/Masterclass";
import Data from "../DataStore/Courses.json";

const DynamicCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  // Scroll to top and find course by ID
  useEffect(() => {
    window.scrollTo(0, 0);

    // Convert id from string to number for accurate matching
    const foundCourse = Data.find((item) => item.id === Number(id));
    setCourse(foundCourse || null);
  }, [id]);

  // If course not found, show fallback UI
  if (!course) {
    return (
      <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Course Not Found
        </h2>
        <p className="text-gray-600 text-sm">
          The course you’re looking for doesn’t exist or has been removed.
        </p>
      </main>
    );
  }

  return (
    <main className="w-full mb-10 flex flex-col items-center bg-white">
      {/* Hero Section */}
      <section className="w-full">
        <DHero
          title={course.courseDetails}
          image={course.img}
          previousPrice={course.previousprice}
          currentPrice={course.actualprice}
          percent={course.percent}
          perks={course.perks}
          onEnroll={() => console.log(`Enroll clicked for course ${course.id}`)}
        />
      </section>

      {/* Course Stages */}
      <section className="w-full">
        <StagesOfSSC />
      </section>

      {/* Masterclass Section */}
      <section className="w-full ">
        <Masterclass />
      </section>

      {/* Quiz & Notes */}
      <section className="w-full">
        <QuizandNotes />
      </section>

      {/* Mentor Section */}
      <section className="w-full mt-4">
        <MeetMentor />
      </section>

      {/* Related Courses Section */}
      <section className="w-full py-12">
        <CoursesYouLike title={true} />
      </section>
    </main>
  );
};

export default DynamicCourse;
