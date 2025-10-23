import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Data from "../DataStore/Courses.json";
import CoursesSmallCard from "./Card/CoursesSmallCard";

const CoursesYouLike = () => {
  return (
    <section className="w-full py-10 bg-white">
      <div className="max-w-full mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Courses You Might Like
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Scroll through curated batches for your success
          </p>
        </div>

        {/* Horizontal Carousel */}
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        //   navigation={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {Array.isArray(Data) ? (
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
      </div>
    </section>
  );
};

export default CoursesYouLike;
