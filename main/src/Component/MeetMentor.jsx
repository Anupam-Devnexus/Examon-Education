import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import Data from "../DataStore/Mentor.json";

const MeetMentor = () => {
  return (
    <section className="w-full py-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
        {/* Header */}
        <div className="text-center md:text-right md:order-2">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700">Meet Our</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-[var(--primary-color)] leading-tight">
            Mentors
          </h3>
        </div>

        {/* Swiper Carousel */}
        <div className="w-full md:max-w-4xl">
          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            speed={800}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="w-full"
          >
            {Data.map((mentor) => (
              <SwiperSlide key={mentor.id}>
                <div
                  className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-xl p-6 shadow-xl border border-gray-200 transition-all duration-300 ease-in-out"
                  style={{ backgroundImage: "url(./Group.svg)", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
                >
                  {/* Mentor Image */}
                  <div className="flex justify-center w-full md:w-1/2">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-lg"
                    />
                  </div>

                  {/* Mentor Info */}
                  <div className="flex flex-col justify-between w-full md:w-1/2 h-full">
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{mentor.name}</h3>
                      <p className="text-base font-medium text-gray-700">{mentor.designation}</p>
                      <p className="text-sm text-gray-600">{mentor.experience}</p>
                    </div>

                    <div className="mt-4 space-y-2">
                      <p className="text-base text-gray-700 italic">
                        Specialization: <span className="font-medium">{mentor.specialization}</span>
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
