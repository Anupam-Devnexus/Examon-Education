import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import Data from "../DataStore/Mentor.json";

const MeetMentor = () => {
  return (
    <section className="w-full py-8 overflow-hidden bg-white">
      <div className="max-w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        {/* Header */}
        <div className="md:w-1/3 text-left md:text-right mr-4 md:order-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-700">Meet Our</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold text-[var(--primary-color)] leading-tight">
            Mentors
          </h3>
        </div>

        {/* Swiper Carousel */}
        <div className="w-full">
          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            speed={800}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="w-full max-w-5xl"
          >
            {Data.map((mentor) => (
              <SwiperSlide key={mentor.id}>
                <div
                  className="flex flex-col md:flex-row items-center gap-8 border-r-14 border-t-14 border-b-14 border-[#6E889B] rounded-xl p-8 shadow-2xl min-h-[32rem] bg-cover bg-no-repeat"
                  style={{ backgroundImage: "url(./Group.svg)" }}
                >
                  {/* Mentor Image */}
                  <div className="flex items-center justify-center w-full md:w-1/2">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className=" w-72 md:w-96 md:h-96 object-cover"
                    />
                  </div>

                  {/* Mentor Info */}
                  <div className="flex flex-col justify-between h-72 w-full md:w-1/2">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold text-gray-900">{mentor.name}</h3>
                      <p className="text-base font-medium text-gray-700">{mentor.designation}</p>
                      <p className="text-sm text-gray-600">{mentor.experience}</p>
                    </div>

                    <div className="mt-4 space-y-2">
                      <p className="text-base text-gray-700 italic">
                        Specialization: {mentor.specialization}
                      </p>
                      {/* Uncomment if LinkedIn is needed */}
                      {/* <a
                        href={mentor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm text-white bg-[var(--primary-color)] px-5 py-2 rounded-full hover:bg-blue-700 transition"
                      >
                        LinkedIn
                      </a> */}
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
