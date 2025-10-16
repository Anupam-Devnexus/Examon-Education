import React from 'react';
import ContactSection from '../Component/ContactSection';
import Data from "../DataStore/Courses.json";
import CoursesCard from '../Component/Card/CoursesCard';

const Courses = () => {
    return (
        <section className='py-10 '>
            {/* Header Section */}
            <section className='flex flex-col p-4 items-start'>
                <span className='font-extrabold text-2xl md:text-5xl text-[var(--primary-color)]'>Courses</span>
                <p className='text-[var(--text-color)] w-full md:w-1/2'>
                    Lorem ipsum dolor sit amet consectetur
                    adipiscing elit tortor eu egestas morbi
                    sem vulputate etiam facilisis pellentesque ut quis.
                </p>
            </section>

            {/* Courses Grid */}
            <div className='flex p-3 items-center justify-center min-w-full bg-[#EEF6FC]'>

            <section className='grid grid-cols-1 max-w-6xl mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-6 '>
                {Data.map((course) => (
                    <CoursesCard key={course.id} {...course} />
                ))}
            </section>
            </div>

            {/* Contact Section */}
            <ContactSection />
        </section>
    );
};

export default Courses;
