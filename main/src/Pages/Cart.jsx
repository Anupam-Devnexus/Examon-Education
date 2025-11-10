// src/Pages/Cart.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { useCourseStore } from "../Zustand/GetAllCourses";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCourseStore();

  // Calculate totals efficiently
  const totalAmount = useMemo(
    () => cart.reduce((sum, item) => sum + (item.actualprice || 0), 0),
    [cart]
  );
  console.log("Cart Total Amount:", cart);

  // Handle checkout logic
  const handleCheckout = () => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    } else {
      window.open("https://classplusapp.com/", "_blank");
    }
  };

  // Empty cart UI
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <img
          src="/empty-cart.svg"
          alt="Empty Cart"
          className="w-56 mb-4 opacity-80"
          loading="lazy"
        />
        <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">Looks like you haven’t added anything yet.</p>
        <button
          onClick={() => navigate("/courses")}
          className="mt-6 bg-[var(--primary-color)] text-white px-6 py-3 rounded-full font-medium hover:brightness-95 transition"
        >
          Browse Courses
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 md:px-12 lg:px-20">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
        Your Cart ({cart.length})
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 border-b pb-6 last:border-none"
            >
              <img
                src={item?.img ? item.img : item.image}
                alt={item.courseDetails}
                className="w-32 h-24 sm:w-40 sm:h-28 object-cover rounded-xl"
                loading="lazy"
              />

              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {item.courseDetails ? item.courseDetails : item.title}
                </h3>
                {item.discount && (
                  <p className="text-green-600 text-sm font-medium mt-1">
                    {item.discount}% OFF
                  </p>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 justify-center sm:justify-start">
                  <span className="text-xl font-bold text-black">
                    ₹{item.actualprice}
                  </span>
                  {item.previousprice && (
                    <span className="text-gray-400 line-through text-sm">
                      ₹{item.previousprice}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium transition text-sm"
              >
                <FiTrash2 /> Remove
              </button>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="lg:w-1/3 bg-white rounded-2xl shadow-md p-6 h-fit">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Discount</span>
            <span>₹0.00</span>
          </div>
          <div className="flex justify-between text-gray-800 font-semibold text-lg border-t pt-3 mt-3">
            <span>Total</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-[var(--primary-color)] text-white py-3 rounded-full font-semibold hover:brightness-95 transition"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={() => navigate("/courses")}
            className="mt-3 w-full border border-[var(--primary-color)] text-[var(--primary-color)] py-3 rounded-full font-semibold hover:bg-[var(--tertiary-color)] transition"
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Cart);
