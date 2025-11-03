import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { useCourseStore } from "../../Zustand/GetAllCourses";

const CoursesSmallCard = ({
  image,
  courseName,
  actualPrice,
  previousPrice,
  discount,
  courseId,
}) => {
  const navigate = useNavigate();

  // Zustand store functions
  const { addToCart, removeFromCart, cart } = useCourseStore();

  // Check if the course is already in the cart
  const isInCart = useMemo(
    () => cart.some((item) => item.id === courseId),
    [cart, courseId]
  );

  // Handle navigation to course details
  const handleExplore = () => navigate(`/courses/${courseId}`);

  // Handle cart add/remove
  const handleCartToggle = () => {
    if (isInCart) {
      removeFromCart(courseId);
    } else {
      addToCart({
        id: courseId,
        img: image,
        courseDetails: courseName,
        actualprice: actualPrice,
        previousprice: previousPrice,
        discount,
      });
    }
  };

  return (
    <div
      className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl 
                 transition-all duration-300 overflow-hidden h-full max-h-[420px]"
    >
      {/* Course Image */}
      <div className="relative w-full h-40">
        <img
          src={image}
          alt={courseName}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {discount && (
          <span className="absolute top-2 right-2 bg-[#F11A28] text-white text-xs font-semibold px-2 py-1 rounded-md">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Course Info */}
      <div className="flex flex-col flex-grow p-4">
        <h3
          className="text-black text-base sm:text-lg font-semibold line-clamp-2 min-h-[48px]"
          title={courseName}
        >
          {courseName}
        </h3>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-black font-bold text-lg sm:text-xl">
              ₹{actualPrice}
            </span>
            {previousPrice && (
              <span className="text-gray-500 line-through text-sm">
                ₹{previousPrice}
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-auto flex items-center gap-2 pt-4">
          <button
            onClick={handleExplore}
            className="bg-[var(--primary-color)] text-white px-4 py-2 
                       rounded-lg font-semibold cursor-pointer transition w-1/2 text-sm sm:text-base"
          >
            Explore
          </button>

          <button
            onClick={handleCartToggle}
            className={`flex items-center justify-center gap-2 px-2 py-2 rounded-lg font-semibold  text-sm transition
              ${
                isInCart
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--tertiary-color)]"
              }`}
          >
            {isInCart ? (
              <>
                <FaTrashAlt size={14} /> Remove
              </>
            ) : (
              <>
                <FaShoppingCart size={14} /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesSmallCard;
