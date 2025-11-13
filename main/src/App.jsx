import React, { Suspense, lazy } from "react";
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

import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer";
import Whatsapp from "./Component/Whatsapp";
import ProtectedRoute from "./auth/ProtectedRoute";


/* Lazy-loaded pages for better performance */
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
const Blog = lazy(() => import("./Pages/Blog"));
const DynamicBlog = lazy(() => import("./Pages/DynamicBlog"));
const Cart = lazy(() => import("./Pages/Cart"));
const Login = lazy(() => import("./auth/Login"));
const Register = lazy(() => import("./auth/Register"));
const ViewQuizPop = lazy(() => import("./Component/ViewQuizPop"));

/*  Main App */
function App() {

  return (
    <Router>
      <div className="App flex flex-col min-h-screen bg-white text-gray-900">
        {/* Global Navbar */}
        <Navbar />

        {/* Lazy-load route components */}
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-[60vh] text-gray-500 animate-pulse text-lg font-medium">
              Loading page…
            </div>
          }
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/study-material" element={<StudyMaterial />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<DynamicBlog />} />

            {/* Dynamic Routes */}
            <Route path="/courses/:courseId" element={<DynamicCourses />} />
            <Route path="/exams/:_id" element={<DynamicExam />} />
            <Route path="/quiz/:_id" element={<DynamicQuiz />} />
            <Route path="/view-quiz/:_id" element={<ViewQuizPop />} />

            {/* Protected Routes */}
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


            {/* Fallback 404 */}
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
        <Whatsapp
        />

        {/* Global Footer */}
        <Footer />

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
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
