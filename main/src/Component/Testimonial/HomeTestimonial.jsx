import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import TestimonialCard from "../Card/TestimonialCard";
import Data from "../../DataStore/testimonial.json";

const HomeTestimonial = () => {
  const swiperRef = useRef(null);

  return (
    <section className="w-full py-10 md:py-16 px-4 md:px-8 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center bg-[var(--primary-color)] rounded-t-xl">
        <div className="w-full md:w-1/2 p-6 space-y-2">
          <span className="text-white font-semibold text-sm md:text-base tracking-wide">
            OUR REVIEWS
          </span>
          <h2 className="text-white text-2xl md:text-4xl font-bold">
            What Our Students Say
          </h2>
        </div>

        <div className="w-full md:w-1/2 h-[20vh] flex justify-end items-center bg-white p-4 rounded-bl-2xl space-x-3">
          <button
            onClick={() => swiperRef.current.swiper.slidePrev()}
            className="p-3 rounded-full bg-[var(--primary-color)] text-white hover:scale-110 transition-transform duration-200 shadow-md"
            aria-label="Previous testimonials"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => swiperRef.current.swiper.slideNext()}
            className="p-3 rounded-full bg-[var(--primary-color)] text-white hover:scale-110 transition-transform duration-200 shadow-md"
            aria-label="Next testimonials"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="w-full bg-[var(--primary-color)] p-6 rounded-b-xl">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={false}
          className="grid place-items-center"
        >
          {Data.map((item, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <TestimonialCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeTestimonial;
