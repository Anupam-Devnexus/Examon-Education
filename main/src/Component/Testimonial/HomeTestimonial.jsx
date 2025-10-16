import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import TestimonialCard from "../Card/TestimonialCard";
import Data from "../../DataStore/testimonial.json";

const HomeTestimonial = () => {
  const swiperRef = useRef(null);

  return (
    <section className="w-full bg-white overflow-hidden relative">
      {/* Decorative Background Circles */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-[var(--secondary-color)] rounded-md opacity-20 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[var(--secondary-color)] rounded-md opacity-20 -z-10"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between">

        {/* Header */}
        <div className="w-full flex-col md:flex justify-between h-3/4 items-start text-center">
          <div className="h-2 w-full bg-[#CCDEEB] mb-4 rounded-md"></div>
          <div className="flex flex-col px-3 items-start gap-3">

            <span className="text-[var(--text-color)] text-sm md:text-base tracking-wide font-semibold">
              OUR REVIEWS
            </span>
            <h2 className="text-3xl md:text-6xl font-bold text-[var(--primary-color)] mt-2">
              What Our Students Say
            </h2>
          </div>
          <div className="h-2 w-full bg-[#CCDEEB] mt-4 rounded-full"></div>
        </div>

        {/* Swiper + Arrows */}
        <div
          className="relative flex items-center gap-3 justify-center md:h-[500px] w-full"
          style={{
            background: `url('./testimonialBack.svg') center/contain no-repeat`,
          }}
        >
          {/* Left Arrow */}
          <button
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="absolute hidden md:block md:left-[5%] z-20 bg-[var(--primary-color)] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
            aria-label="Previous testimonial"
          >
            <FaArrowLeft />
          </button>

          {/* Swiper Section */}
          <div className="flex justify-center items-center w-full">
            <Swiper
              ref={swiperRef}
              modules={[EffectCards, Autoplay]}
              effect="cards"
              grabCursor={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              className="w-[300px] md:w-[360px] lg:w-[400px]"
            >
              {Data.map((item, index) => (
                <SwiperSlide key={index}>
                  <TestimonialCard {...item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className="absolute hidden md:block md:right-[5%] z-20 bg-[var(--primary-color)] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
            aria-label="Next testimonial"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

    </section>
  );
};

export default HomeTestimonial;
