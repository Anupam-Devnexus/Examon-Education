import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import RecordedBatchesCard from "./Card/RecordedBatchesCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Data from "../DataStore/Batches.json"

const LiveRecordedBatches = () => {

  const swiperRef = React.useRef(null);

  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white relative">
      <h2 className="text-center text-4xl md:text-5xl font-bold mb-12 text-[var(--primary-color)]">
        Live & Recorded Batches
      </h2>

      <div className="max-w-full mx-auto relative px-2">
        <Swiper
          ref={swiperRef}
          modules={[EffectCoverflow, Autoplay, Navigation]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true} 
          speed={1000} 
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 3 },
          }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 120,
            modifier: 1.2,
            slideShadows: false,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          className="w-full"
        >
          {Data.map((batch) => (
            <SwiperSlide key={batch.id} className="flex justify-center">
              <RecordedBatchesCard {...batch} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-50px] flex items-center gap-6 z-30">
          <button
            onClick={() => swiperRef.current.swiper.slidePrev()}
            className="bg-[var(--primary-color)] text-white p-2 cursor-pointer rounded-full shadow-lg hover:scale-110 transition-transform"
            aria-label="Previous Slide"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => swiperRef.current.swiper.slideNext()}
            className="bg-[var(--primary-color)] text-white p-2 cursor-pointer rounded-full shadow-lg hover:scale-110 transition-transform"
            aria-label="Next Slide"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LiveRecordedBatches;