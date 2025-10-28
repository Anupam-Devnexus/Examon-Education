import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Data from "../DataStore/Mentor.json";

const MeetMentor = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-12">
        {/* Header */}
        <div className="text-center md:text-right md:order-2 md:w-1/3">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700">Meet Our</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-[var(--primary-color)] leading-tight">
            Mentors
          </h3>
        </div>

        {/* Swiper Carousel */}
        <div className="w-full md:max-w-4xl">
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={40}
            loop={true}
            speed={800}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="w-full"
          >
            {Data.map((mentor) => (
              <SwiperSlide key={mentor.id}>
                <div
                  className="relative flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-lg overflow-hidden border-4 border-gray-100"
                >
                  {/* Background Decorative Layer */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-[var(--primary-color)]/10 via-transparent to-transparent z-0"
                    style={{
                      backgroundImage: "url('/Group.svg')",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      opacity: 0.4,
                    }}
                  ></div>

                  {/* Mentor Image */}
                  <div className="relative flex justify-center items-center w-full md:w-1/2 p-6 z-10">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-full"></div>
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="relative w-64 h-72 md:w-80 md:h-80 object-cover"
                      />
                    </div>
                  </div>

                  {/* Mentor Info */}
                  <div className="relative flex flex-col justify-center gap-4 text-gray-800 p-6 md:p-8 w-full md:w-1/2 z-10">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {mentor.name}
                      </h3>
                      <p className="text-base font-medium text-[var(--primary-color)]">
                        {mentor.designation}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {mentor.experience}
                      </p>
                    </div>

                    <div className="mt-2 space-y-2">
                      <p className="text-sm italic ">
                        Specialization:{" "}
                        <span className="font-medium text-gray-800">
                          {mentor.specialization}
                        </span>
                      </p>
                      {mentor.linkedin && (
                        <a
                          href={mentor.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-sm text-white bg-[var(--primary-color)] px-5 py-2 rounded-full hover:bg-blue-700 transition"
                        >
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default MeetMentor;
