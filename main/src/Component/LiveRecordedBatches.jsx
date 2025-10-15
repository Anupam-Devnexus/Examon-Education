import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import RecordedBatchesCard from "./Card/RecordedBatchesCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const LiveRecordedBatches = () => {

  const batches = [
    {
      id: 1,
      batchName: "SSC JE 2025 (ME) — Final Punch (Live + Recording) Complete Batch",
      syllabus: "Complete Technical + Non-Technical",
      duration: "1 Year",
      price: 3499,
      link: "/ssc-je-me",
      image: "https://images.unsplash.com/photo-1581093588401-22f26c9e6d87",
      instructor: "Er. Ankit Sharma",
      startDate: "2025-11-01"
    },
    {
      id: 2,
      batchName: "SSC JE 2025 (EE) — Final Punch (Live + Recording) Complete Batch",
      syllabus: "Complete Technical + Non-Technical",
      duration: "1 Year",
      price: 3499,
      link: "/ssc-je-ee",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      instructor: "Er. Priya Tiwari",
      startDate: "2025-11-03"
    },
    {
      id: 3,
      batchName: "SSC JE 2025 (CE) — Final Punch (Live + Recording) Complete Batch",
      syllabus: "Complete Technical + Non-Technical",
      duration: "1 Year",
      price: 3499,
      link: "/ssc-je-ce",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      instructor: "Er. Rahul Verma",
      startDate: "2025-11-05"
    },
    {
      id: 4,
      batchName: "RRB JE 2025 (ME) — Complete Course (Live + Recording)",
      syllabus: "Technical + General Awareness + Reasoning",
      duration: "1 Year",
      price: 3299,
      link: "/rrb-je-me",
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc",
      instructor: "Er. Shubham Patil",
      startDate: "2025-12-01"
    },
    {
      id: 5,
      batchName: "RRB JE 2025 (EE) — Complete Course (Live + Recording)",
      syllabus: "Technical + General Awareness + Reasoning",
      duration: "1 Year",
      price: 3299,
      link: "/rrb-je-ee",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
      instructor: "Er. Neha Singh",
      startDate: "2025-12-05"
    },
    {
      id: 6,
      batchName: "GATE 2026 (ME) — Master Batch (Live + Recording)",
      syllabus: "Full Technical Syllabus + Aptitude",
      duration: "1 Year",
      price: 4999,
      link: "/gate-me",
      image: "https://images.unsplash.com/photo-1581093588401-22f26c9e6d87",
      instructor: "Dr. Manish Kumar",
      startDate: "2025-12-10"
    },
    {
      id: 7,
      batchName: "GATE 2026 (EE) — Master Batch (Live + Recording)",
      syllabus: "Full Technical Syllabus + Aptitude",
      duration: "1 Year",
      price: 4999,
      link: "/gate-ee",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      instructor: "Er. Tanvi Gupta",
      startDate: "2025-12-12"
    },
    {
      id: 8,
      batchName: "GATE 2026 (CE) — Master Batch (Live + Recording)",
      syllabus: "Full Technical Syllabus + Aptitude",
      duration: "1 Year",
      price: 4999,
      link: "/gate-ce",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      instructor: "Er. Rajesh Pandey",
      startDate: "2025-12-15"
    },
    {
      id: 9,
      batchName: "PSU 2025 (ME) — Selection Focused Crash Course",
      syllabus: "Technical + Practice Sets + PYQs",
      duration: "6 Months",
      price: 2999,
      link: "/psu-me",
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
      instructor: "Er. Kavita Sharma",
      startDate: "2025-11-25"
    },
    {
      id: 10,
      batchName: "PSU 2025 (EE) — Selection Focused Crash Course",
      syllabus: "Technical + Practice Sets + PYQs",
      duration: "6 Months",
      price: 2999,
      link: "/psu-ee",
      image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367d",
      instructor: "Er. Prakash Deshmukh",
      startDate: "2025-11-27"
    },
    {
      id: 11,
      batchName: "SSC JE 2026 (ME) — Foundation Batch (Live + Recording)",
      syllabus: "Complete Technical + Non-Technical",
      duration: "1 Year",
      price: 3799,
      link: "/ssc-je-2026-me",
      image: "https://images.unsplash.com/photo-1571171637578-041a44b31f3e",
      instructor: "Er. Deepak Chauhan",
      startDate: "2026-01-05"
    },
    {
      id: 12,
      batchName: "SSC JE 2026 (EE) — Foundation Batch (Live + Recording)",
      syllabus: "Complete Technical + Non-Technical",
      duration: "1 Year",
      price: 3799,
      link: "/ssc-je-2026-ee",
      image: "https://images.unsplash.com/photo-1521790361400-7d3bca19b3cc",
      instructor: "Er. Nidhi Sharma",
      startDate: "2026-01-08"
    },
    {
      id: 13,
      batchName: "SSC JE 2026 (CE) — Foundation Batch (Live + Recording)",
      syllabus: "Complete Technical + Non-Technical",
      duration: "1 Year",
      price: 3799,
      link: "/ssc-je-2026-ce",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
      instructor: "Er. Harish Nair",
      startDate: "2026-01-10"
    },
    {
      id: 14,
      batchName: "State AE/JE 2025 (ME) — Complete Course (Live + Recording)",
      syllabus: "Technical + General Studies + Reasoning",
      duration: "1 Year",
      price: 3599,
      link: "/state-je-me",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      instructor: "Er. Rohan Sinha",
      startDate: "2025-12-20"
    },
    {
      id: 15,
      batchName: "State AE/JE 2025 (EE) — Complete Course (Live + Recording)",
      syllabus: "Technical + General Studies + Reasoning",
      duration: "1 Year",
      price: 3599,
      link: "/state-je-ee",
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
      instructor: "Er. Priyanka Sharma",
      startDate: "2025-12-22"
    },
    {
      id: 16,
      batchName: "ISRO Technical Assistant (ME) — Complete Batch",
      syllabus: "Technical + Practice Papers + Interview Prep",
      duration: "8 Months",
      price: 2799,
      link: "/isro-me",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      instructor: "Er. Arjun Mehta",
      startDate: "2025-12-30"
    },
    {
      id: 17,
      batchName: "ISRO Technical Assistant (EE) — Complete Batch",
      syllabus: "Technical + Practice Papers + Interview Prep",
      duration: "8 Months",
      price: 2799,
      link: "/isro-ee",
      image: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2",
      instructor: "Er. Sneha Reddy",
      startDate: "2026-01-02"
    },
    {
      id: 18,
      batchName: "BPSC AE (ME) — Full Course (Live + Recording)",
      syllabus: "Technical + General Studies + Reasoning",
      duration: "1 Year",
      price: 3699,
      link: "/bpsc-ae-me",
      image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367d",
      instructor: "Er. Pankaj Kumar",
      startDate: "2025-11-20"
    },
    {
      id: 19,
      batchName: "UPPSC AE (ME) — Target Batch (Live + Recording)",
      syllabus: "Technical + Non-Technical + PYQs",
      duration: "1 Year",
      price: 3699,
      link: "/uppsc-ae-me",
      image: "https://images.unsplash.com/photo-1581091215367-59ab6c1d58c0",
      instructor: "Er. Vishal Agrawal",
      startDate: "2025-11-22"
    },
    {
      id: 20,
      batchName: "SSC JE 2025 (ME) — Test Series + Analysis Batch",
      syllabus: "Mock Tests + PYQ Discussion + Doubt Solving",
      duration: "6 Months",
      price: 1999,
      link: "/ssc-je-me-test-series",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      instructor: "Er. Divya Patel",
      startDate: "2025-11-28"
    }
  ];

  const swiperRef = React.useRef(null);

  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white relative">
      <h2 className="text-center text-4xl md:text-5xl font-bold mb-12 text-[var(--primary-color)]">
        Live & Recorded Batches
      </h2>

      <div className="max-w-7xl mx-auto relative px-4">
        <Swiper
          ref={swiperRef}
          modules={[EffectCoverflow, Autoplay, Navigation]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          infinite={true}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="w-full"
        >
          {batches.map((batch) => (
            <SwiperSlide
              key={batch.id}
              className=" gap-3 "
            >
              <RecordedBatchesCard {...batch} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-50px] flex items-center gap-6 z-30">
          <button
            onClick={() => swiperRef.current.swiper.slidePrev()}
            className="bg-[var(--primary-color)] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
            aria-label="Previous Slide"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => swiperRef.current.swiper.slideNext()}
            className="bg-[var(--primary-color)] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
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