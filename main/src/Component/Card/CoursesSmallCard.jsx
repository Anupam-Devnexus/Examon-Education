import React from 'react';
import { useNavigate } from 'react-router-dom';

const CoursesSmallCard = ({ image, courseName, actualPrice, previousPrice, discount, courseId }) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300">
      <img
        src={image}
        alt={courseName}
        className="w-full h-40 object-cover rounded-md mb-3"
      />

      <span className="text-black text-lg font-semibold mb-2">{courseName}</span>

      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-black font-bold text-xl">₹{actualPrice}</span>
          <span className="text-[var(--text-color)] line-through ml-2">₹{previousPrice}</span>
        </div>
        <span className="text-[#F11A28] font-semibold">{discount}% OFF</span>
      </div>

      <div className="flex items-center gap-2 mt-auto">
        <button
          onClick={handleExplore}
          className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-800 transition"
        >
          Explore
        </button>
        <button className="px-4 py-2 rounded-md text-[var(--primary-color)] border border-[var(--primary-color)] hover:bg-[var(--tertiary-color)] transition">
          Add to Favourite
        </button>
      </div>
    </div>
  );
};

export default CoursesSmallCard;
