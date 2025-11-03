import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

import { useAuthStore } from "./Zustand/useAuthStore";
import Footer from "./Component/Footer";
import Navbar from "./Component/Navbar/Navbar";

/* ✅ Lazy-loaded pages */
const Home = lazy(() => import("./Pages/Home"));
const Aboutus = lazy(() => import("./Pages/Aboutus"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const Courses = lazy(() => import("./Pages/Courses"));
const DynamicCourses = lazy(() => import("./Pages/DynamicCourse"));
const Quiz = lazy(() => import("./Pages/Quiz"));
const DynamicQuiz = lazy(() => import("./Pages/DynamicTest"));
const StudyMaterial = lazy(() => import("./Pages/StudyMaterial"));
const DynamicExam = lazy(() => import("./Pages/DynamicExam"));
const Profile = lazy(() => import("./Pages/UserProfile"));
const Cart = lazy(() => import("./Pages/Cart"));
const Login = lazy(() => import("./auth/Login"));
const Register = lazy(() => import("./auth/Register"));

/* 🔐 Protected Route Component */
const ProtectedRoute = ({ children }) => {
  const storedAuth = JSON.parse(localStorage.getItem("auth"));
  const token = storedAuth?.user?.refreshToken || storedAuth?.token;

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render protected component
  return children;
};

function App() {
  const { restoreSession, initialized } = useAuthStore();

  /* Initialize Zustand auth session on first load */
  useEffect(() => {
    if (!initialized) restoreSession();
  }, [initialized, restoreSession]);

  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Navbar />

        {/* Page Suspense loader */}
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-[50vh] text-lg text-gray-500 animate-pulse">
              Loading page...
            </div>
          }
        >
          <Routes>
            {/* 🔹 Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/study-material" element={<StudyMaterial />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 🔹 Dynamic Routes */}
            <Route path="/courses/:courseId" element={<DynamicCourses />} />
            <Route path="/exams/:_id" element={<DynamicExam />} />
            <Route path="/quiz/:_id" element={<DynamicQuiz />} />

            {/* 🔐 Protected Routes (Require Token) */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            {/* 🔸 404 Fallback */}
            <Route
              path="*"
              element={
                <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-500">
                  404 — Page Not Found
                </div>
              }
            />
          </Routes>
        </Suspense>

        <Footer />

        {/* 🔔 Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </div>
    </Router>
  );
}

export default App;
