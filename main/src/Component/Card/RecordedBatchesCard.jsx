import React from "react";
import { GrFormNextLink } from "react-icons/gr";

const RecordedBatchesCard = ({
  image,
  batchName,
  syllabus,
  duration,
  price,
  teachers = [],
  enrollLink,
}) => {
  return (
    <div
      className="relative group overflow-hidden rounded-2xl cursor-pointer h-[280px] md:h-[360px] transition-transform hover:scale-[1.02] shadow-2xl"
      onClick={() => window.open(enrollLink, "_blank")}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={batchName}
        loading="lazy"
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4 flex flex-col justify-end text-white">

        <div className="space-y-2 flex items-end text-white gap-2">
          <div>

          <h3 className="text-lg md:text-xl font-bold leading-snug">
            {batchName}
          </h3>
          <p className="text-sm text-white line-clamp-2">{syllabus}</p>



          {/* {teachers.length > 0 && (
            <p className="text-sm mt-2">
              <span className="text-white">Teachers:</span>{" "}
              {teachers.join(", ")}
            </p>
          )} */}
              <span> Duration: {duration}</span>

          </div>
          <div className="flex flex-col gap-2">

            <div className="text-lg mt-2 flex flex-col">
              <span> Price: ₹{price}</span>
            </div>
            <button
              className="mt-4 flex items-center gap-2 bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] cursor-pointer text-white text-sm py-2 px-4 rounded-md w-fit transition-all"
              onClick={(e) => {
                e.stopPropagation();
                window.open(enrollLink, "_blank");
              }}
            >
              View <GrFormNextLink className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordedBatchesCard;
