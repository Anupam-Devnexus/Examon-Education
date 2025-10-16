import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import MentorCard from "./Card/Mentor";
import Data from "../DataStore/Mentor.json";

const MeetMentor = () => {
  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-white py-10 md:py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10 px-5 md:px-10">
        {/* Left Side — Swiper */}
        <div className="w-full h-[450px] ">
          <Swiper
            direction="vertical"
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            speed={1000}
            mousewheel={true}
            pagination={{ clickable: true }}
            modules={[Mousewheel, Pagination]}
            className="h-full"
          >
            {Data.map((mentor) => (
              <SwiperSlide key={mentor.id}>
                <MentorCard {...mentor} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Side — Text Poster */}
        <div className="hidden lg:flex flex-col justify-center h-full">
          <h2 className="text-5xl  text-gray-800 leading-tight">
            Meet Our <br />
            <span className="text-[var(--primary-color)] font-extrabold">Mentors</span>
          </h2>
          
        </div>
      </div>
    </section>
  );
};

export default MeetMentor;
