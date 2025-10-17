import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Data from "../DataStore/Mentor.json";

const MeetMentor = () => {
  return (
    <section className="w-full py-16 px-4 overflow-hidden">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 justify-around items-center">
        {/* Header (Top on mobile, right on desktop) */}
        <div className="order-1 md:order-2 flex flex-col items-start md:items-end text-left md:text-right">
          <h2 className="text-xl md:text-2xl font-bold text-gray-700">Meet Our</h2>
          <span className="text-4xl md:text-6xl font-extrabold text-[var(--primary-color)]">
            Mentors
          </span>

          <div className="w-24 h-1 bg-[var(--secondary-color)] rounded-full mt-4 md:w-48" />
        </div>

        {/* Swiper Carousel */}
        <div className="order-2 md:order-1 w-full"
        style={{
                      background: 'url(./Group.svg)',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                    }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            speed={1000}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="w-full max-w-6xl"
          >
            {Data.map((mentor) => (
              <SwiperSlide key={mentor.id}>
                <div
                  className="flex flex-col md:flex-row items-center gap-8 border-8 border-[var(--secondary-color)] rounded-3xl p-8 shadow-2xl  min-h-[32rem]"

                >
                  {/* Mentor Image */}
                  <div className="w-96 h-96 flex items-center justify-center"
                  >
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-52 h-52 object-cover drop-shadow-2xl rounded-xl border-4 border-white shadow-xl"
                    />
                  </div>

                  {/* Mentor Info */}
                  <div className="flex flex-col justify-between max-w-5xl">
                    <div className="flex flex-col gap-3">
                      <h3 className="text-3xl font-bold text-[#000]">
                        {mentor.name}
                      </h3>
                      <p className="text-base font-medium text-[#000]">
                        {mentor.designation}
                      </p>
                      <p className="text-sm text-gray-500">{mentor.experience}</p>

                      <p className="text-xs text-gray-500 italic mt-1">
                        Specialization: {mentor.specialization}
                      </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 mt-4">
                      <a
                        href={mentor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white bg-[var(--primary-color)] px-5 py-2 rounded-full hover:bg-blue-700 transition"
                      >
                        LinkedIn
                      </a>

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
