import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MeetMentor from '../Component/MeetMentor';
import DHero from '../Component/DynamicPage/DHero';
import CoursesYouLike from '../Component/CoursesYouLike';

const DynamicCourse = () => {
  const { id } = useParams();

  // Optional: Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <main className="w-full mb-10 flex flex-col items-center bg-white">
      {/* Hero Section */}
      <section className="w-full">
        <DHero
          title="RapidFire - SSC JE 2025 Junior Engineer (Mechanical) Online MCQ Crash Course Live Batch"
          image="https://res.cloudinary.com/dt4ohfuwc/image/upload/v1760590838/Picture2_zkells.png"
          onEnroll={() => console.log("Enroll clicked!")}
        />
      </section>

      {/* Mentor Section */}
      <section className="w-full  py-8">
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
