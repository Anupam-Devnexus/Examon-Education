import React from "react";
import { TiTickOutline } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { CiPercent } from "react-icons/ci";

const CoursesCard = ({
  img,
  actualprice,
  previousprice,
  percent,
  courseDetails,
  insideCourses,
  perks,
  Discount,
  amount,
}) => {
  return (
    <div className="rounded-xl bg-white flex flex-col flex-1 h-[500px] md:h-[520px] shadow-xl overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      {/* UPPER PART */}
      <div className="relative shadow-2xl p-2 rounded-2xl w-full h-48 md:h-56 overflow-hidden">
        <img src={img} alt={courseDetails} className="object-cover rounded-2xl w-full h-full" />
        <div className="absolute bottom-0 left-0 w-full bg-white px-4 py-1 flex justify-between items-center text-sm md:text-lg">
          <span className="font-bold text-black">₹{actualprice}</span>
          <span className="line-through text-gray-300">₹{previousprice}</span>
          <span className="text-red-400">{percent}% OFF</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex flex-col gap-2 px-4 py-3 overflow-y-auto max-h-[calc(500px-14rem)] md:max-h-[calc(520px-14rem)]">
        <span className="font-semibold text-md">{courseDetails}</span>
        <ul className="text-sm text-gray-600 space-y-1 max-h-24 overflow-y-auto pr-1">
  {Array.isArray(insideCourses) &&
    insideCourses.map((item, index) => (
      <li key={index} className="flex items-start gap-2">
        <TiTickOutline className="text-green-600 mt-1" />
        <span>{item}</span>
      </li>
    ))}
</ul>


        {/* Perks */}
        <div className="flex flex-wrap gap-2 mt-2">
          {perks &&
            perks.map((perk, i) => (
              <div
                key={i}
                className={`px-3 py-1 rounded-md text-white text-xs font-medium ${
                  perk.toLowerCase() === "new"
                    ? "bg-red-600"
                    : "bg-[var(--primary-color)]"
                }`}
              >
                {perk}
              </div>
            ))}
        </div>

        {/* Extra Discount */}
        {Discount && (
          <div className="flex items-center gap-2 text-sm text-red-600 font-medium mt-2">
            <CiPercent className="text-xl" />
            <span>EXTRA ₹{amount} COUPON DISCOUNT</span>
          </div>
        )}

        {/* <hr className="my-3" /> */}
      </div>

      {/* Fixed Bottom Actions */}
      <div className="px-4 py-3 mt-auto flex items-center justify-between bg-white border-t">
        <div className="p-3 bg-[var(--primary-color)] rounded-full text-white hover:scale-110 transition-transform cursor-pointer">
          <FaRegHeart />
        </div>
        <button className="px-6 py-2 rounded-2xl text-white bg-[var(--primary-color)] text-sm font-semibold hover:bg-blue-700 transition-all">
          Explore
        </button>
      </div>
    </div>
  );
};

export default CoursesCard;
