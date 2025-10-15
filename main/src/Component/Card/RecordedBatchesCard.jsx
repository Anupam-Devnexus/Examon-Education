import React from "react";
import { useNavigate } from "react-router-dom";
import { GrFormNextLink } from "react-icons/gr";

const RecordedBatchesCard = ({
  image,
  batchName,
  syllabus,
  duration,
  price,
  link,
  instructor,
  startDate,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative group overflow-hidden  rounded-2xl cursor-pointer h-[280px] md:h-[360px] transition-transform hover:scale-[1.02] shadow-2xl"
      onClick={() => navigate(link)}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={batchName}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4 flex items-end  justify-end text-white">
        
        <div className="flex flex-col">

        <h3 className="text-lg md:text-xl font-bold leading-snug mb-1">
          {batchName}
        </h3>
        <p className="text-sm text-gray-300">{syllabus}</p>

        <div className="text-sm flex flex-wrap gap-3 mt-3">
          <span>Time : {duration}</span>
        </div>

        <div className="mt-2 text-sm space-y-1">
          <p>{instructor}</p>
          <p>{new Date(startDate).toLocaleDateString()}</p>
        </div>
        </div>
<div className="flex flex-col">
          <span>Price ₹{price}</span>

        <button
          className="flex items-center gap-3 bg-[var(--primary-color)] cursor-pointer text-white text-sm py-2 px-4 rounded-md w-fit transition-all"
          onClick={(e) => {
            e.stopPropagation();
            navigate(link);
          }}
        >
          View <GrFormNextLink/>
        </button>
</div>
      </div>
    </div>
  );
};

export default RecordedBatchesCard;
