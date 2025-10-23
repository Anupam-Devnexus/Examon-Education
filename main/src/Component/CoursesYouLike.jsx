import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Data from "../DataStore/Courses.json";
import CoursesSmallCard from "./Card/CoursesSmallCard";

const CoursesYouLike = ({ title = false }) => {
  const breakpointsConfig = title
    ? {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
    }
    : {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    };

  const renderCarousel = () => (
    <Swiper
      modules={[Navigation, Autoplay]}
      slidesPerView={1}
      spaceBetween={20}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      breakpoints={breakpointsConfig}
      className="w-full"
    >
      {Array.isArray(Data) && Data.length > 0 ? (
        Data.map((course) => (
          <SwiperSlide key={course.id}>
            <CoursesSmallCard
              image={course.img}
              courseName={course.courseDetails}
              actualPrice={course.actualprice}
              previousPrice={course.previousprice}
              discount={course.percent}
              courseId={course.id}
            />
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <CoursesSmallCard
            image={Data.img}
            courseName={Data.courseDetails}
            actualPrice={Data.actualprice}
            previousPrice={Data.previousprice}
            discount={Data.percent}
            courseId={Data.id}
          />
        </SwiperSlide>
      )}
    </Swiper>
  );

  return (
    <section className="w-full py-10 bg-white">
      <div className="w-full">
        {title ? (
          <div className="flex flex-col md:flex-row items-center gap-8"
            style={{
              backgroundImage: `url('/Ellipse1.svg')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "left center",
            }}
          >
            {/* Left Title Section */}
            <div
              className="w-full h-full flex items-center justify-center md:justify-start"
            >
              <h2 className="text-2xl md:text-4xl font-bold text-[var(--primary-color)] text-center md:text-left leading-snug">
                Courses you may like!
              </h2>
            </div>

            {/* Right Carousel Section */}
            <div className="w-full md:w-2/3">{renderCarousel()}</div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Courses You Might Like
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Scroll through curated batches for your success
              </p>
            </div>

            {/* Carousel */}
            {renderCarousel()}
          </>
        )}
      </div>
    </section>
  );
};

export default CoursesYouLike;
