import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Footer from "./Component/Footer";
import Navbar from "./Component/Navbar/Navbar";

// Lazy-loaded pages
const Home = lazy(() => import("./Pages/Home"));
const Aboutus = lazy(() => import("./Pages/Aboutus"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const Courses = lazy(() => import("./Pages/Courses"));
const DynamicCourses = lazy(() => import("./Pages/DynamicCourse"))
const Quiz = lazy(() => import("./Pages/Quiz"));
const DynamicQuiz = lazy(() => import("./Pages/DynamicTest"))
const StudyMaterial = lazy(() => import("./Pages/StudyMaterial"));
// const Blog = lazy(() => import("./Pages/Blog"));
const DynamicExam = lazy(()=> import("./Pages/DynamicExam"))
const Profile = lazy(() => import('./Pages/UserProfile'))

const Login = lazy(() => import('./auth/Login'));
const Register = lazy(() => import('./auth/Register'));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/study-material" element={<StudyMaterial />} />
            {/* <Route path="/blog" element={<Blog />} /> */}
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses/:id" element={<DynamicCourses />} />
            <Route path="/exams/:id" element={<DynamicExam/>}/>
            <Route path="/quiz/:id" element={<DynamicQuiz />} />
            <Route path="/profile" element={<Profile/>}/>


            {/* Optional: 404 Page */}
            <Route path="*" element={<div className="text-center mt-10">Page Not Found</div>} />
          </Routes>
        </Suspense>
        <Footer />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
}

export default App;
